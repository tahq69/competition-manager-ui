<template>
  <div :class="groupClass" class="form-group crip-form-group">
    <label
        v-if="label"
        :for="id"
        :id="`${id}-label`"
        :class="labelClass"
    >
      {{ label }}
    </label>
    <div :class="controlClass">
      <slot/>
      <form-errors :errors="formErrors"/>
    </div>
  </div>
</template>

<script lang="ts">
import Utils from "@/Helpers/Utils"
import FormErrors from "./FormErrors.vue"
import Form from "./Form"

export default {
  name: "formGroup",

  components: { FormErrors },

  props: {
    for: { type: String, required: true },
    label: { type: String, default: () => "" },
    form: { type: Form, default: () => new Form({ __: false }) },
    errors: { type: Array, default: () => [] },
    colLg: { type: Number, default: () => 0 },
    colMd: { type: Number, default: () => 0 },
    colSm: { type: Number, default: () => 0 },
    colXs: { type: Number, default: () => 12 },
  },

  computed: {
    id() {
      return this.for
    },

    labelClass() {
      return this.getColClass("label", ["control-label"])
    },

    controlClass() {
      if (this.label == "") return this.getColClass("empty")

      return this.getColClass("control")
    },

    groupClass() {
      return {
        "has-error": this.hasErrors,
      }
    },

    formErrors() {
      if (Utils.isDefined(this.form.data.__) && this.form.data.__ === false) {
        return this.errors
      }

      return this.form.errors[this.for] || []
    },

    hasErrors() {
      return this.formErrors.length > 0
    },
  },

  methods: {
    getColClass(
      method: "control" | "label" | "empty",
      initial: string[] = [],
    ): string[] {
      ;["Lg", "Md", "Sm", "Xs"].forEach(size => {
        const value = this[`col${size}`]
        if (value > 0) {
          initial.push(this[`${method}Calc`](value, size.toLowerCase()))
        }
      })

      return initial
    },

    labelCalc(size: number, media: string, asOffset = false): string {
      return this.colClass(this.offset(size), media, asOffset)
    },

    controlCalc(size: number, media: string): string {
      return this.colClass(size, media)
    },

    colClass(size: number, media: string, offset = false) {
      let template = offset ? "col-{media}-offset-{size}" : "col-{media}-{size}"

      return Utils.supplant(template, { media, size })
    },

    emptyCalc(size: number, media: string): string {
      const control = this.controlCalc(size, media)
      const offset = this.labelCalc(size, media, true)
      return `${control} ${offset}`
    },

    offset(size: number) {
      const availableSpace = 12 - size

      if (availableSpace == 0) return 0

      return availableSpace
    },
  },
}
</script>