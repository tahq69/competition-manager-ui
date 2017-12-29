<script lang="ts">
import Vue from "vue"

import Alert from "@/Components/Alert.vue"
import Utils from "@/Helpers/Utils"
import Form from "./Form"

import { IClasses } from "@/types"

export default Vue.extend({
  name: "FormPanel",

  components: { Alert },

  props: {
    bodyColLg: { type: Number, default: () => 0 },
    bodyColMd: { type: Number, default: () => 0 },
    bodyColSm: { type: Number, default: () => 0 },
    bodyColXs: { type: Number, default: () => 12 },
    colLg: { type: Number, default: () => 0 },
    colMd: { type: Number, default: () => 0 },
    colSm: { type: Number, default: () => 0 },
    colXs: { type: Number, default: () => 12 },
    form: { type: Form, default: () => new Form({ __: false }) },
    title: { type: String, required: true },
  },

  data() {
    return {
      showError: false,
    }
  },

  computed: {
    contentClass(): string[] {
      const self = this as any
      return self.cols("bodyCol{size}")
    },

    elementClass(): IClasses {
      const self = this as any
      const initial = {
        "has-data-errors": this.hasErrors,
        "has-global-error": this.hasError,
      }
      return self.cols(`col{size}`, initial)
    },

    hasErrors(): boolean {
      const self = this as any
      return self.form.hasErrors
    },

    hasError(): boolean {
      const self = this as any
      return self.form.hasUnknownError
    },

    error(): string {
      const self = this as any
      return self.form.unknownError
    },
  },

  methods: {
    submit() {
      this.$emit("submit")
    },

    cols(selectorTemplate: string, initial: IClasses = {}) {
      const self = this as any
      (["Lg", "Md", "Sm", "Xs"]).forEach(size => {
        const valueKey = Utils.supplant(selectorTemplate, { size })
        const value = self[valueKey]

        // Skip zero values to avoid un-required classes
        if (value <= 0) return

        const offset = parseInt(((12 - value) / 2).toString(), 10)
        const sizeKey = size.toLowerCase()
        initial[`col-${sizeKey}-offset-${offset}`] = true
        initial[`col-${sizeKey}-${value}`] = true
      })

      return initial
    },
  },

  watch: {
    hasError(value: boolean, oldValue: boolean) {
      const self = this as any
      if (!oldValue && value) {
        self.showError = true
      }

      if (oldValue && !value) {
        self.showError = false
      }
    },
  },
})
</script>

<template>
  <form @submit.prevent="submit"
        :class="elementClass"
        class="crip-form-panel crip-panel">
    <div class="panel panel-default">

      <div class="panel-heading clearfix">
        <div class="v-panel-title pull-left">{{ title }}</div>
        <div class="v-panel-title pull-right">
          <slot name="actions" />
        </div>
      </div>

      <div class="panel-body form-horizontal">
        <div class="row">
          <alert :is-visible.sync="showError"
                 class="col-md-12">
            {{ error }}
          </alert>

          <div :class="contentClass">
            <slot/>
          </div>
        </div>
      </div>

    </div>
  </form>
</template>
