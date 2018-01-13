import Vue from "vue"

import { Utils } from "@/Helpers"

export default {
  beforeRouteUpdate(this: any, to: any, from: any, next: any) {
    // Make sure we update component heights when entering new page.
    this.maxHeight = 0
    next()
  },

  data() {
    return {
      maxHeight: 0,
    }
  },

  methods: {
    setupHeight(this: any, options: { height: number }) {
      if (options.height > this.maxHeight) this.maxHeight = options.height
    },
  },

  mounted(this: any) {
    // Debounce window resize event and force badges to update height.
    window.addEventListener(
      "resize",
      Utils.debounce(() => (this.maxHeight = 0), 100),
    )
  },
}
