<template>
  <ul class="pagination" v-if="hasMoreThanOnePage">
    <li
        v-for="page in pages"
        :class="getClass(page)"
        :key="page.nr"
    >
      <router-link
          :to="getRoute(page)"
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
    curr(): number {
      return this.paging.$page | 0
    },

    hasMoreThanOnePage(): boolean {
      return this.pages.length > 3
    },

    pages(): Page[] {
      let prev = Page.prev(this.curr)
      let next = Page.next(this.curr, this.paging.lastPage)

      let pages = [prev]

      // if page count greater than visible, calculate where place '...'
      if (this.paging.lastPage > this.paging.show) {
        let delta = ~~(this.paging.show / 2)
        let startFrom = this.curr - delta
        let endOn = this.curr + delta

        if (startFrom < 1) startFrom = 1
        if (startFrom > 1) {
          // Add page 1 at the beginning
          pages.push(new Page("1", 1))
          // If first page is not 2, push ...
          if (startFrom - 1 !== 1) {
            pages.push(new Page("...", startFrom - 1))
          }
        }

        if (endOn > this.paging.lastPage) endOn = this.paging.lastPage

        // add all visible pages
        for (let i = startFrom; i <= endOn; i++) {
          pages.push(new Page(i.toString(), i))
        }

        if (endOn < this.paging.lastPage) {
          // if there is pages between last and last visible, show ... between them
          if (this.paging.lastPage - 1 !== endOn) {
            pages.push(new Page("...", endOn + 1))
          }
          // Add last page to the end of paging
          pages.push(new Page(this.paging.lastPage, this.paging.lastPage))
        }

        pages.push(next)

        return pages
      }

      for (let i = 1; i <= this.paging.lastPage; i++) {
        pages.push(new Page(i.toString(), i))
      }

      pages.push(next)

      return pages
    },
  },

  methods: {
    getRoute(page) {
      const route = JSON.parse(JSON.stringify(this.paging.route))
      this.$logger.log("getRoute", route)
      if (!page) {
        page = this.curr
      }

      if (!route.params) {
        route.params = { page: page.nr }
      } else {
        route.params.page = page.nr
      }

      return route
    },

    getClass(page) {
      if (this.isDisabled(page)) {
          return this.paging.disabledClass
        }

        if (this.isActive(page)) {
          return this.paging.activeClass
        }

        return ''
    },

    isCurr(page) {
      return (page.nr | 0) === (this.curr | 0)
    },

    isDisabled(page) {
      return this.isCurr(page) && (page.text | 0) === 0
    },

    isActive(page) {
      return this.isCurr(this.curr) && !this.isDisabled(page)
    },
  },
}
</script>