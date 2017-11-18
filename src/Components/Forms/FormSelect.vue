<template>
  <div class="dropdown v-form-select" :class="{'open': open}">
    <input
        class="form-control"
        type="text"
        v-model="search"
        @focus="focus"
        @blur="blur"
        @keydown.enter="enter"
        @keydown.down="down"
        @keydown.up="up"
        @input="change"
    />
    <ul class="dropdown-menu" style="width:100%">
      <li
          v-for="(option, index) in matches"
          :class="{'active': isActive(index)}"
          :key="index"
      ><a @click.prevent="optionClick(index)" href="#">
        {{ text(option) }}
      </a></li>

      <li
          v-if="loading"
          class="disabled"
      ><a href="#">Searching...</a></li>

      <li
          v-if="availableOptions.length === 0"
          class="disabled"
      ><a href="#">No data</a></li>
    </ul>
</div>
</template>

<script lang="ts">
export default {
  name: "FormSelect",

  props: {
    text: { type: Function, required: true },
    options: { type: Array, required: false, default: () => [] },
    async: { type: Boolean, required: false, default: () => false },
    searchOptions: { type: Function, required: false, default: () => null },
    openOnFocus: { type: Boolean, required: false, default: () => true },
  },

  data() {
    return {
      loading: false,
      open: false,
      current: -1,
      search: "",
      fetchedOptions: [],
    }
  },

  created() {
    this.$logger.component(this)
  },

  computed: {
    // Filtering the options based on the input
    matches() {
      return this.availableOptions.filter(option => {
        const searchIn = this.text(option).toLowerCase()
        return searchIn.indexOf(this.search.toLowerCase()) >= 0
      })
    },

    availableOptions() {
      if (this.fetchedOptions.length > 0) {
        return this.fetchedOptions
      }

      return this.options
    },
  },

  methods: {
    focus() {
      if (this.openOnFocus) {
        this.open = true
      }
    },

    blur() {
      // Close dropdown only when click binding is already propongadated.
      setTimeout(() => {
        this.open = false
      }, 100)
    },

    // When enter pressed on the input
    enter() {
      this.selectOption()
    },

    // When up pressed while options are open
    up() {
      if (this.current > -1) this.current--
    },

    // When up pressed while options are open
    down() {
      if (this.current < this.matches.length - 1) this.current++
    },

    // For highlighting element
    isActive(index) {
      return index === this.current
    },

    // When the user changes input
    change() {
      if (this.open == false) {
        this.open = true
        this.current = -1
      }

      this.fetchOptions()
    },

    async fetchOptions() {
      if (!this.async || this.loading) return

      this.loading = true
      try {
        this.fetchedOptions = (await this.searchOptions(this.search)) || []
        this.loading = false
      } catch {
        this.loading = false
      }
    },

    // When one of the option is clicked
    optionClick(index) {
      this.current = index
      this.selectOption()
    },

    selectOption() {
      if (this.current > -1) {
        // if user is focused some option in a predefined list, set it as input
        // value
        this.search = this.text(this.matches[this.current])
        this.open = false
        this.$emit("input", this.matches[this.current])
      } else {
        // otherwise fire create event
        this.$emit("create", this.search)
      }
    },
  },
}
</script>

<style>
.v-form-select {
  position: relative;
}
</style>

