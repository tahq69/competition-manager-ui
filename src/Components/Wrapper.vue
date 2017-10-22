<template>
  <div class="crip-wrapper">
    <transition
        name="fade-horizontal" mode="out-in"
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutRight">
      <router-view/>
    </transition>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    mounted () {
      this.$logger.component(this)
    }
  })
</script>