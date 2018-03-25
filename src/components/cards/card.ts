import Vue from "vue"

export default {
  props: {
    height: { type: Number, required: false },
  },

  data: () => ({ isMounted: false }),

  computed: {
    elHeight(this: any): string {
      return this.height > 0 && this.isMounted ? `${this.height}px` : "auto"
    },
  },

  mounted(this: any) {
    const images = this.$el.getElementsByTagName("img")
    if (images.length > 0) {
      // If a card has an image, we need wait until it loads and only then
      // calculate real height of card to ensure full image fits in each tile.

      const img = images[0] as HTMLImageElement
      img.onload = () => {
        this.isMounted = true
        this.$emit("dimensions", { height: this.$el.offsetHeight })
      }
    } else {
      // Otherwyse we can imediatly after data load calculate that height.
      this.isMounted = true
      this.$emit("dimensions", { height: this.$el.offsetHeight })
    }
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
