<script lang="ts">
import Vue from "vue";
import {
  Category,
  DimensionType,
  DisplayType
} from "@/modules/competitions/models";

export default Vue.extend({
  name: "CategoryShortText",

  props: {
    category: { type: Category }
  },

  data: () => ({
    displayType: DisplayType
  }),

  computed: {
    typeText(): string {
      return this.category.type === DimensionType.Age ? "y" : "Kg";
    }
  },

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <span v-if="category">
    <span v-if="category.display_type == displayType.Min">
      {{category.min}} {{typeText}}
    </span>
    
    <span v-else-if="category.display_type == displayType.Max">
      -{{category.max}} {{typeText}}
    </span>

    <span v-else>
      {{category.min}}-{{category.max}} {{typeText}}
    </span>
  </span>
</template>
