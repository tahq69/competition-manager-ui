<script lang="ts">
import Vue from "vue";

import { Category } from "#/competitions/models/category";
import { Group } from "#/competitions/models/group";
import { fetchGroups, fetchCategories } from "#/competitions/groups/service";

import ManageGroupsLink from "#/competitions/components/ManageGroupsLink.vue";

export default Vue.extend({
  name: "DisciplineGroups",

  components: { ManageGroupsLink },

  props: {
    cm: { type: [Number, String], required: true },
    discipline: { type: [Number, String], required: true }
  },

  data() {
    return {
      canCreate: false,
      groups: [] as Group[],
      categories: [] as string[],
      maxCategoryLength: 0
    };
  },

  computed: {
    canEdit(): boolean {
      return true;
    }
  },

  methods: {
    async fetchGroups() {
      const payload = {
        competition_id: this.cm,
        discipline_id: this.discipline
      };

      const groups = await fetchGroups(payload);
      const pool = groups.map(group => this.fetchCategories(group));

      this.groups = groups;
      await Promise.all(pool);
    },

    async fetchCategories(group: Group): Promise<void> {
      const categories = await fetchCategories({
        competition_id: group.competition_id,
        discipline_id: group.discipline_id,
        category_group_id: group.id
      });

      group.setCategories(categories);

      if (categories.length > this.maxCategoryLength) {
        this.maxCategoryLength = categories.length;
        this.categories = categories.map(category => category.id.toString());
      }
    }
  }
});
</script>

<template>
  <div id="discipline-groups">
    <ManageGroupsLink :cm="cm"
                      :discipline="discipline"
                      style="float: right"
                      type="primary"
                      icon="edit"
                      button
                      circle
                      mini />

    <table class="table">
      <tr v-for="group in groups"
          :key="group.id * 100">
        <td v-html="group.shortText"></td>
        <td v-for="(id, index) in categories"
            :key="(group.id * 100) + 1 + index">
          <div v-if="group.categories[index]">
            {{ group.categories[index].shortText }}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
