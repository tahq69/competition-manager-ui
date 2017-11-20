<template>
  <transition
      name="fade-horizontal"
      mode="out-in"
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutRight"
      @enter="handleEnter"
      @leave="handleLeave"
  >
    <div
        :class="classes"
        :style="styles" 
        @mousemove="clearCloseTimer"
        @mouseover="clearCloseTimer"
        @mouseout="setCloseTimer"
    >
      <template v-if="type === 'notice'">
        <div :class="[baseClass + '-content']" ref="content" v-html="content"></div>
        <a
            v-if="closable"
            :class="[baseClass + '-close']"
            @click.prevent="close"
            href="#"
        >
          <i class="fa fa-times"></i>
        </a>
      </template>
      <template v-if="type === 'message'">
        <div :class="[baseClass + '-content']" ref="content">
          <div :class="[baseClass + '-content-text']" v-html="content"></div>
          <a
              v-if="closable"
              :class="[baseClass + '-close']"
              @click.prevent="close"
              href="#"
          >
            <i class="fa fa-times"></i>
          </a>
        </div>
      </template>
    </div>
  </transition>
</template>

<script lang="ts">
export default {
  name: "Notice",

  props: {
    name: { type: String, required: true },
    prefixCls: { type: String, default: () => "" },
    duration: { type: Number, default: () => 1.5 },
    type: { type: String },
    content: { type: String, default: () => "" },
    styles: { type: Object, default: () => ({ right: "50%" }) },
    closable: { type: Boolean, default: () => false },
    className: { type: String },
    onClose: { type: Function },
    transitionName: { type: String },
  },

  data() {
    return {
      withDesc: false,
    }
  },

  computed: {
    baseClass() {
      return `crip-notice-notice`
    },

    classes() {
      return [
        this.baseClass,
        {
          [`${this.className}`]: !!this.className,
          [`${this.baseClass}-closable`]: this.closable,
          [`${this.baseClass}-with-desc`]: this.withDesc,
        },
      ]
    },

    contentClasses() {
      return `${this.baseClass}-content`
    },
  },

  methods: {
    setCloseTimer() {
      if (this.duration !== 0) {
        this.closeTimer = setTimeout(() => {
          this.close()
        }, this.duration * 1000)
      }
    },

    clearCloseTimer() {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer)
        this.closeTimer = null
      }
    },

    close() {
      this.clearCloseTimer()
      this.onClose()
      this.$parent.close(this.name)
    },

    handleEnter(el) {
      if (this.type === "message") {
        el.style.height = el.scrollHeight + "px"
      }
    },

    handleLeave(el) {
      if (this.type === "message") {
        if (
          document.getElementsByClassName("crip-message-notice").length !== 1
        ) {
          el.style.height = 0
          el.style.paddingTop = 0
          el.style.paddingBottom = 0
        }
      }
    },
  },

  mounted() {
    this.clearCloseTimer()
    this.setCloseTimer()
  },

  beforeDestroy() {
    this.clearCloseTimer()
  },
}
</script>

<style lang="scss" scoped>
.animated {
  animation-duration: 0.5s;
}
</style>

