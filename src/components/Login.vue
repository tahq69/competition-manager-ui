<template>
  <form @submit.prevent="login">
    <input type="email" name="email" id="email" placeholder="Email" v-model="form.username" />
    <input type="password" name="password" id="password" placeholder="Password" v-model="form.password" />
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
export default {
  name: 'Login',

  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    }
  },

  mounted() {
    console.log("Login view mounted!")
  },

  /*methods: {
    async login() {
      const username = this.form.username
      const password = this.form.password
      const authentication = await this.$oauth.login(username, password)
      this.$router.replace('/') 
    }
  }*/
}
</script>
