import { isInArrayValidator as validator } from "@/helpers";
import { CreateElement, VNode } from "vue";

const sizes = ["", "medium", "small", "mini"];
const types = [
  "default",
  "primary",
  "success",
  "info",
  "warning",
  "danger",
  "text"
];
const icons = [
  "",
  "edit",
  "delete",
  "tickets",
  "view",
  "close",
  "check",
  "plus",
  "minus"
];

export default {
  props: {
    tag: { type: String, default: "a" },
    exact: { type: Boolean, default: true },
    button: { type: Boolean, default: false },
    type: { type: String, default: "default", validator: validator(types) },
    size: { type: String, default: "", validator: validator(sizes) },
    icon: { type: String, default: "", validator: validator(icons) },
    tooltip: { type: String, default: "" },
    circle: { type: Boolean, default: false },
    plain: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
    mini: { type: Boolean, default: false }
  },

  computed: {
    elClass(this: any) {
      return {
        "el-link-button el-button": this.button,
        [`el-button--${this.type}`]: this.button,
        [`el-button--${this.size}`]: this.button && this.size && !this.mini,
        "el-button--mini": this.button && this.mini,
        "is-circle": this.button && this.circle,
        "is-plain": this.button && this.plain,
        "is-round": this.button && this.round
      };
    },
    _icon(this: any) {
      return `el-icon-${this.icon}`;
    }
  },

  render(this: any, h: CreateElement): VNode {
    const children = [];

    if (this.icon) {
      children.push(h("i", { attrs: { class: this._icon } }));
    }

    children.push(this.$slots.default);

    const link = h(
      "router-link",
      {
        props: {
          to: this.to,
          tag: this.tag,
          exact: this.exact
        },
        class: this.elClass
      },
      children
    );

    if (!this.$slots.tooltip && !this.tooltip) return link;

    return h("el-tooltip", [
      h("div", { slot: "content" }, this.$slots.tooltip || this.tooltip),
      link
    ]);
  }
};
