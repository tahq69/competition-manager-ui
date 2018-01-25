<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "ManageGroupForm",

  props: {
    defaults: { type: Object, required: false },
  },

  data() {
    return {
      form: {
        title: "",
        short: "",
        rounds: 0,
        time: 0,
        min: 0,
        max: 0,
      },
    }
  },

  methods: {
    submit() {
      this.$emit("submit", Object.assign({}, this.defaults, this.form))
      this.form = {
        title: "",
        short: "",
        rounds: 0,
        time: 0,
        min: 0,
        max: 0,
      }
    },
  },
})
</script>


<template>
  <form @submit.prevent="submit()">
    <div class="form-group mb-1">
      <label class="mb-0">Full title</label>
      <input name="title"
             type="text"
             v-model="form.title"
             class="form-control form-control-sm">
    </div>

    <div class="form-group mb-1">
      <label class="mb-0">Short title</label>
      <input name="short"
             type="text"
             v-model="form.short"
             class="form-control form-control-sm">
    </div>

    <div class="form-group mb-1">
      <label class="mb-0">Rounds</label>
      <input name="rounds"
             type="number"
             v-model="form.rounds"
             class="form-control form-control-sm">
    </div>

    <div class="form-group mb-1">
      <label class="mb-0">Time</label>
      <input name="time"
             type="text"
             v-model="form.time"
             class="form-control form-control-sm">
    </div>

    <div class="form-group mb-1">
      <label class="mb-0">Minimum value</label>
      <input name="min"
             type="number"
             v-model="form.min"
             class="form-control form-control-sm">
    </div>

    <div class="form-group mb-1">
      <label class="mb-0">Maximum value</label>
      <input name="max"
             type="number"
             v-model="form.max"
             class="form-control form-control-sm">
    </div>

    <button type="submit"
            class="btn btn-primary btn-sm">
      Add
    </button>
  </form>
</template>
