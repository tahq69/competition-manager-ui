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
    },

    title(): string {
      switch (this.category.display_type) {
        case DisplayType.Min:
          return `Starting from ${this.category.min} ${this.typeText}`;
        case DisplayType.Max:
          return `Until ${this.category.max} ${this.typeText}`;
        default:
          return `Starting from ${this.category.min} until ${
            this.category.max
          } ${this.typeText}`;
      }
    }
  }
});
</script>

<template>
  <el-tooltip v-if="category"
              effect="light"
              :open-delay="500">
    <div slot="content">
      {{ category.title }}<br/>{{ title }}
    </div>

    <span v-if="category.display_type == displayType.Min">
      {{category.min}}{{typeText}}
    </span>

    <span v-else-if="category.display_type == displayType.Max">
      -{{category.max}}{{typeText}}
    </span>

    <span v-else>
      {{category.min}}-{{category.max}}{{typeText}}
    </span>
  </el-tooltip>
</template>
