<script lang="ts">
export default {
  name: "FormSelect",

  props: {
    async: { type: Boolean, default: () => false },
    init: { type: Function, default: () => async () => null },
    openOnFocus: { type: Boolean, default: () => true },
    options: { type: Array, default: () => [] },
    searchOptions: { type: Function, default: () => null },
    text: { type: Function, required: true },
  },

  data() {
    return {
      checkpoint: null,
      current: -1,
      fetchedOptions: [],
      loading: false,
      open: false,
      search: "",
    }
  },

  created() {
    this.log = this.$logger.component(this)
  },

  async mounted() {
    const initialValue = await this.init()
    this.log("mounted", { initialValue })
    if (this.async && initialValue) {
      this.options.push(initialValue)
      this.current = 0
      this.search = this.text(this.availableOptions[this.current])
      this.createCheckpoint()
    } else {
      this.current = this.options.indexOf(initialValue)
    }
  },

  computed: {
    availableOptions() {
      let options = this.options

      if (!this.hasMatchingOptions && this.search && this.search.length > 0) {
        options = [{ __text: this.search }, ...this.options]
      }

      return [...options, ...this.fetchedOptions]
    },

    hasMatchingOptions() {
      const filter = o => this.text(o).toLowerCase() === this.search
      return (
        this.options.filter(filter).length > 0 ||
        this.fetchedOptions.filter(filter).length > 0
      )
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

    // When esc pressed on the input
    escape(e: Event) {
      // setup last checkpoint as current one
      if (this.availableOptions.indexOf(this.checkpoint.option) === -1) {
        this.options.push(this.checkpoint.option)
      }

      this.search = this.checkpoint.search
      this.current = this.availableOptions.indexOf(this.checkpoint.option)
      this.open = false
    },

    // When enter pressed on the input
    enter(e: Event) {
      this.log("enter", { e, current: this.current, open: this.open })
      if (this.open) {
        // Avoid form submit if dropdown is open and selection in list is on
        // some of the elements.
        e.preventDefault()
      }

      this.selectOption()
    },

    // When up pressed while options are open
    up() {
      if (this.current > -1) this.current--
    },

    // When up pressed while options are open
    down() {
      if (this.current < this.availableOptions.length - 1) this.current++
    },

    // For highlighting element
    isActive(index) {
      return index === this.current
    },

    // When the user changes input
    change() {
      if (this.open === false) {
        this.open = true
        this.current = 0
      }

      this.fetchOptions()
    },

    async fetchOptions() {
      if (!this.async || !this.search || this.loading) return

      this.loading = true
      try {
        this.fetchedOptions = (await this.searchOptions(this.search)) || []
        this.loading = false
      } catch {
        this.loading = false
      }
    },

    createCheckpoint() {
      this.checkpoint = {
        index: this.current,
        option: this.availableOptions[this.current],
        search: this.search,
      }
    },

    // When one of the option is clicked
    optionClick(index) {
      this.current = index
      this.selectOption()
    },

    selectOption() {
      const option = this.availableOptions[this.current]
      this.open = false

      if (typeof option.__text === "undefined") {
        // if user is focused some option in a predefined list, set it as input
        // value
        this.search = this.text(option)
        this.$emit("input", option)
      } else {
        // otherwise fire create event
        this.$emit("create", option.__text)
      }

      this.createCheckpoint()
    },
  },
}
</script>

<style>
.v-form-select {
  position: relative;
}
</style>

<template>
  <div class="dropdown v-form-select" :class="{'open': open}">
    <input
        class="form-control"
        type="text"
        v-model="search"
        @focus="focus"
        @blur="blur"
        @keydown.esc="escape"
        @keydown.enter="enter"
        @keydown.down="down"
        @keydown.up="up"
        @input="change"
    />
    <ul class="dropdown-menu" style="width:100%">
      <li
          v-for="(option, index) in availableOptions"
          :class="{'active': isActive(index)}"
          :key="index"
      >
        <a @click.prevent="optionClick(index)" href="#">
          {{ option.__text || text(option) }}
        </a>
      </li>

      <li
          v-if="loading"
          class="disabled"
      >
        <a href="#">Searching...</a>
      </li>

      <li
          v-if="availableOptions.length === 0"
          class="disabled"
      >
        <a href="#">No data</a>
      </li>
    </ul>
  </div>
</template>
