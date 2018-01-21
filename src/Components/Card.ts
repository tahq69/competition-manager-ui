import Vue from "vue"

export default {
  props: {
    height: { type: Number, required: false },
  },

  data() {
    return {
      isMounted: false,
    }
  },

  computed: {
    elHeight(this: any): string {
      return this.height > 0 && this.isMounted ? `${this.height}px` : "auto"
    },
  },

  mounted(this: any) {
    this.$emit("dimensions", { height: this.$el.offsetHeight })
    this.isMounted = true
  },

  watch: {
    height(this: any, newHeight: number, oldHeight: number) {
      if (newHeight === 0) {
        Vue.nextTick(() => {
          // Update dimensions when parent says that unified value is unset, but
          // only when auto height is applied to component.
          this.$emit("dimensions", { height: this.$el.offsetHeight })
        })
      }
    },
  },
}
