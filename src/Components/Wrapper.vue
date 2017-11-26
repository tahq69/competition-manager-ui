<script lang="ts">
export default {
  name: "Wrapper",

  mounted() {
    this.$logger.component(this)
  },
}
</script>

<template>
  <div class="crip-wrapper">
    <transition
        name="fade-horizontal"
        mode="out-in"
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutRight"
    >
      <router-view/>
    </transition>
  </div>
</template>
