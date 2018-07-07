<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ImageCard"
});
</script>

<template>
  <el-card shadow="hover"
           class="image-card"
           :body-style="{ padding: '0px' }">
    <div class="card-image">
      <slot name="image">
        <!-- image slot -->
      </slot>
    </div>
    <div class="card-body">
      <slot>
        <!-- default content slot -->
      </slot>
    </div>
  </el-card>
</template>

<style lang="scss">
.image-card {
  position: relative;

  .card-image img {
    width: 100%;
    display: block;
  }

  .card-body {
    padding: 16px;

    .card-header {
      margin-top: 0;
      margin-bottom: 6px;
    }

    .card-subheader {
      margin-top: 0;
    }
  }

  .card-edit-link {
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
}
</style>

