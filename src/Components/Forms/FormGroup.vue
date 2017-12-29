<script lang="ts">
import Vue from "vue"

import Utils from "@/Helpers/Utils"
import { IClasses } from "@/types"
import FormErrors from "./FormErrors.vue"

import Form from "./Form"

type methods = "control" | "label" | "empty"

export default Vue.extend({
  name: "FormGroup",

  components: { FormErrors },

  props: {
    colLg: { type: Number, default: () => 0 },
    colMd: { type: Number, default: () => 0 },
    colSm: { type: Number, default: () => 0 },
    colXs: { type: Number, default: () => 12 },
    errors: { type: Array, default: () => [] },
    for: { type: String },
    form: { type: Form, default: () => new Form({ __: false }) },
    label: { type: String, default: () => "" },
  },

  computed: {
    id(): string {
      const self = this as any
      return self.for || ""
    },

    labelClass(): string {
      const self = this as any
      return self.getColClass("label", ["control-label"])
    },

    controlClass(): string {
      const self = this as any
      if (this.label === "") return self.getColClass("empty")

      return self.getColClass("control")
    },

    groupClass(): IClasses {
      const self = this as any
      return {
        "has-error": self.hasErrors,
      }
    },

    formErrors(): string[] {
      const self = this as any
      if (Utils.isDefined(self.form.data.__) && self.form.data.__ === false) {
        return self.errors
      }

      return self.form.errors[self.for] || []
    },

    hasErrors(): boolean {
      const self = this as any
      return self.formErrors.length > 0
    },
  },

  methods: {
    getColClass(method: methods, initial: string[] = []): string[] {
      const self = this as any
      const sizes = ["Lg", "Md", "Sm", "Xs"]
      sizes.forEach(size => {
        const value = self[`col${size}`]
        if (value > 0) {
          initial.push(self[`${method}Calc`](value, size.toLowerCase()))
        }
      })

      return initial
    },

    labelCalc(size: number, media: string, asOffset = false): string {
      const self = this as any
      return self.colClass(self.offset(size), media, asOffset)
    },

    controlCalc(size: number, media: string): string {
      const self = this as any
      return self.colClass(size, media)
    },

    colClass(size: number, media: string, offset = false) {
      const template = offset ? "col-{media}-offset-{size}" : "col-{media}-{size}"

      return Utils.supplant(template, { media, size })
    },

    emptyCalc(size: number, media: string): string {
      const self = this as any
      const control = self.controlCalc(size, media)
      const offset = self.labelCalc(size, media, true)
      return `${control} ${offset}`
    },

    offset(size: number) {
      const availableSpace = 12 - size

      if (availableSpace === 0) return 0

      return availableSpace
    },
  },
})
</script>

<template>
  <div :class="groupClass"
       class="form-group crip-form-group">
    <label v-if="label"
           :for="id"
           :id="`${id}-label`"
           :class="labelClass">
      {{ label }}
    </label>
    <div :class="controlClass">
      <slot/>
      <form-errors :errors="formErrors" />
    </div>
  </div>
</template>
