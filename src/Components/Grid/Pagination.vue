<template>
  <ul class="pagination" v-if="hasMoreThanOnePage">
    <li
        v-for="page in pages"
        :class="{
          [paging.disabledClass]: page.disabled,
          [paging.activeClass]: page.active
        }"
        :key="page.key"
    >
      <router-link
          :to="page.route"
          :title="page.title"
          onclick="this.blur();"
      >
        {{ page.text }}
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import Page from "./Page"
import Paging from "./Paging"

export default {
  props: {
    paging: { type: Paging },
  },

  computed: {
    curr() {
      return this.paging.$page
    },

    route() {
      return this.paging.route
    },

    hasMoreThanOnePage(): boolean {
      return this.pages.length > 3
    },

    pages(): Page[] {
      const last = this.paging.lastPage
      const prew = this.curr > 1 ? this.curr - 1 : 1
      const next = this.curr >= last ? last : this.curr + 1
      const prewText = this.$t("app.paging_prew")
      const prewPage = new Page(this.curr, prewText, prew, this.route)
      const nextText = this.$t("app.paging_next")
      const nextPage = new Page(this.curr, nextText, next, this.route)
      const pages = [prewPage]
      const moreText = this.$t("app.paging_more")

      // if page count greater than visible, calculate where place '...'
      if (last > this.paging.show) {
        let delta = ~~(this.paging.show / 2)
        let startFrom = this.curr - delta
        if (startFrom < 1) startFrom = 1
        let endOn = this.curr + delta
        if (endOn > last) endOn = last

        if (startFrom > 1) {
          // Add page 1 at the beginning
          pages.push(new Page(this.curr, "1", 1, this.route))
          // If first page is not 2, push ...
          if (startFrom !== 2) {
            pages.push(new Page(this.curr, moreText, startFrom - 1, this.route))
          }
        }

        // add all visible pages
        for (let i = startFrom; i <= endOn; i++) {
          pages.push(new Page(this.curr, i.toString(), i, this.route))
        }

        if (endOn < last) {
          // if there is pages between last and last visible, show ... between them
          if (last - 1 !== endOn) {
            pages.push(new Page(this.curr, moreText, endOn + 1, this.route))
          }
          // Add last page to the end of paging
          pages.push(new Page(this.curr, last.toString(), last, this.route))
        }

        pages.push(nextPage)

        return pages
      }

      for (let i = 1; i <= this.paging.lastPage; i++) {
        pages.push(new Page(this.curr, i.toString(), i, this.route))
      }

      pages.push(nextPage)

      return pages
    },
  },
}
</script>