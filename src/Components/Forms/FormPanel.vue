<template>
  <form
      @submit.prevent="submit"
      :class="elementClass"
      class="crip-form-panel crip-panel"
  >
    <div class="panel panel-default">

      <div class="panel-heading clearfix">
        <div class="v-panel-title pull-left">
          {{ title }}
        </div>
        <div class="v-panel-title pull-right">
          <slot name="actions"/>
        </div>
      </div>

      <div class="panel-body form-horizontal">
        <div class="row">
          <alert
              :is-visible.sync="showError"
              class="col-md-12"
          >
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

<script lang="ts">
import Alert from "@/Components/Alert.vue"
import Utils from "@/Helpers/Utils"
import Form from "./Form"

export default {
  name: "FormPanel",

  components: { Alert },

  props: {
    title: { type: String, required: true },
    form: { type: Form, default: () => new Form({ __: false }) },
    bodyColLg: { type: Number, default: () => 0 },
    bodyColMd: { type: Number, default: () => 0 },
    bodyColSm: { type: Number, default: () => 0 },
    bodyColXs: { type: Number, default: () => 12 },
    colLg: { type: Number, default: () => 0 },
    colMd: { type: Number, default: () => 0 },
    colSm: { type: Number, default: () => 0 },
    colXs: { type: Number, default: () => 12 },
  },

  data() {
    return {
      showError: false,
    }
  },

  computed: {
    contentClass(): string[] {
      return this.calculateColClass("bodyCol{size}")
    },

    elementClass() {
      let classes = []

      if (this.hasErrors) {
        classes.push("has-data-errors")
      }

      if (this.hasError) {
        classes.push("has-global-error")
      }

      return this.calculateColClass("col{size}", classes)
    },

    hasErrors() {
      return this.form.hasErrors
    },

    hasError() {
      return this.form.hasUnknownError
    },

    error() {
      return this.form.unknownError
    },
  },

  methods: {
    submit() {
      this.$emit("submit")
    },

    calculateColClass(selectorTemplate: string, initial: string[] = []) {
      ;["Lg", "Md", "Sm", "Xs"].forEach(size => {
        const valueKey = Utils.supplant(selectorTemplate, { size })
        const value = this[valueKey]

        // Skip zero values to avoid un-required classes
        if (value <= 0) return

        const offset = parseInt(((12 - value) / 2).toString())
        const sizeKey = size.toLowerCase()
        initial.push(`col-${sizeKey}-offset-${offset}`)
        initial.push(`col-${sizeKey}-${value}`)
      })

      return initial
    },
  },

  watch: {
    hasError(value: boolean, oldValue: boolean) {
      if (!oldValue && value) {
        this.showError = true
      }

      if (oldValue && !value) {
        this.showError = false
      }
    },
  },
}
</script>