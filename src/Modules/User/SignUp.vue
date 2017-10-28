<template>
  <div>SignUp.vue</div>
</template>

<script lang="ts">
import Form from "@/Components/Forms/Form"
import FormPanel from "@/Components/Forms/FormPanel.vue"
import FormGroup from "@/Components/Forms/FormGroup.vue"
import Focus from "@/Components/Focus"

import { home } from "@/Router/Routes"
import { middleware as auth } from "@/Components/Auth"

export default {
  name: "SignUp",

  components: { FormPanel, FormGroup },

  directives: { Focus },

  mounted() {
    this.$logger.component(this)

    if (auth.isAuthenticated()) {
      this.$router.push(home)
    }
  },
}
</script>
