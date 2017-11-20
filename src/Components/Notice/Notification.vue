<template>
  <div :class="classes" :style="styles">
    <notice
        v-for="notice in notices"
        :key="notice.name"
        :styles="notice.styles"
        :type="notice.type"
        :content="notice.content"
        :duration="notice.duration"
        :closable="notice.closable"
        :name="notice.name"
        :transition-name="notice.transitionName"
        :on-close="notice.onClose"
    />
  </div>
</template>

<script lang="ts">
import Notice from "./Notice.vue"

let seed = 0
const now = Date.now()

function getUuid() {
  return "cripNotification_" + now + "_" + seed++
}

export default {
  name: "Notification",

  components: { Notice },

  mounted() {
    this.log = this.$logger.component(this)
    this.log("mounted", { styles: this.styles })
  },

  props: {
    styles: { type: Object, default: () => ({ top: "65px", left: "50%" }) },
    content: { type: String },
    className: { type: String },
  },

  data() {
    return {
      notices: [],
    }
  },

  computed: {
    classes() {
      return ["crip-notice", { [this.className]: !!this.className }]
    },
  },

  methods: {
    add(notice) {
      const name = notice.uuid || getUuid()
      const defaults = {
        styles: {
          right: "50%",
        },
        content: "",
        duration: 1.5,
        closable: false,
        name: name,
      }

      this.notices.push(Object.assign(defaults, notice))
    },

    close(name) {
      const notices = this.notices
      for (let i = 0; i < notices.length; i++) {
        if (notices[i].name === name) {
          this.notices.splice(i, 1)
          break
        }
      }
    },

    closeAll() {
      this.notices = []
    },
  },
}
</script>

<style lang="scss">
@import "../../sass/variables";

@mixin close-base($top: 0, $icon-font-size: 22px) {
  font-size: $icon-font-size;
  color: $legend-color;
  transition: color $transition-time ease;
  position: relative;
  top: $top;
  &:hover {
    color: #444;
  }
}

$notice-width: 335px;
$notice-padding: 16px;
$notice-margin-bottom: 10px;

.crip-notice {
  width: $notice-width;
  margin-right: 24px;
  position: fixed;
  z-index: 999990;

  &-notice {
    margin-bottom: $notice-margin-bottom;
    padding: $notice-padding;
    border-radius: $border-radius-small;
    box-shadow: $shadow-base;
    background: #fff;
    line-height: 1;
    position: relative;
    overflow: hidden;

    &-close {
      position: absolute;
      right: 16px;
      top: 15px;
      color: #999;
      outline: none;

      i {
        @include close-base(-3px);
      }
    }

    &-with-desc {
      .crip-notice-notice-close {
        top: 11px;
      }
    }
  }

  &-title {
    font-size: $font-size-base;
    color: $title-color;
    padding-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-with-desc &-title {
    font-weight: bold;
    margin-bottom: 8px;
  }

  &-with-desc.crip-notice-with-icon &-title {
    margin-left: 51px;
  }

  &-desc {
    font-size: 12px;
    color: $text-color;
    text-align: justify;
    line-height: 1.5;
  }
  &-with-desc.crip-notice-with-icon &-desc {
    margin-left: 51px;
  }

  &-with-icon &-title {
    margin-left: 26px;
  }

  &-icon {
    position: absolute;
    left: 20px;
    margin-top: -1px;
    font-size: 16px;

    &-success {
      color: $success-color;
    }
    &-info {
      color: $primary-color;
    }
    &-warning {
      color: $warning-color;
    }
    &-error {
      color: $danger-color;
    }
  }
  &-with-desc &-icon {
    font-size: 36px;
  }

  &-custom-content {
    &:after {
      content: "";
      display: block;
      width: 4px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
    }
  }
  &-with-normal {
    &:after {
      background: $primary-color;
    }
  }
  &-with-info {
    &:after {
      background: $primary-color;
    }
  }
  &-with-success {
    &:after {
      background: $success-color;
    }
  }
  &-with-warning {
    &:after {
      background: $warning-color;
    }
  }
  &-with-error {
    &:after {
      background: $danger-color;
    }
  }
}
</style>
