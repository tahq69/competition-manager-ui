const sizes = ["", "medium", "small", "mini"];
const types = ["default", "primary", "success", "info", "warning", "danger"];
const icons = [
  "",
  "el-icon-edit",
  "el-icon-delete",
  "el-icon-tickets",
  "el-icon-close",
  "el-icon-check",
  "el-icon-plus",
  "el-icon-minus"
];
const validator = (values: string[]) => (value: string) =>
  values.indexOf(value) > -1;

export default {
  props: {
    tag: { type: String, default: "a" },
    exact: { type: Boolean, default: true },
    button: { type: Boolean, default: false },
    type: { type: String, default: "default", validator: validator(types) },
    size: { type: String, default: "", validator: validator(sizes) },
    icon: { type: String, default: "", validator: validator(icons) },
    circle: { type: Boolean, default: false },
    plain: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
    mini: { type: Boolean, default: false }
  },

  computed: {
    elClass() {
      const el: any = this;
      return {
        "el-link-button el-button": el.button,
        [`el-button--${el.type}`]: el.button,
        [`el-button--${el.size}`]: el.button && el.size && !el.mini,
        "el-button--mini": el.button && el.mini,
        "is-circle": el.button && el.circle,
        "is-plain": el.button && el.plain,
        "is-round": el.button && el.round
      };
    }
  }
};
