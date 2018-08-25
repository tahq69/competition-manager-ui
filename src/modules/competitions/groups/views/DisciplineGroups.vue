<script lang="ts">
import Vue from "vue";

import { visibility } from "@/components/mixins";

import { Category, Group } from "@/modules/competitions/models";
import { fetchCategories } from "@/modules/competitions/groups/service";
import { DisciplineAuth } from "@/modules/competitions/disciplines/auth";

import GroupShortText from "@/modules/competitions/components/GroupShortText.vue";
import CategoryShortText from "@/modules/competitions/components/CategoryShortText.vue";

export default Vue.extend({
  name: "DisciplineGroups",

  mixins: [visibility],

  components: { GroupShortText, CategoryShortText },

  props: {
    cm: { type: [Number, String], required: true },
    discipline: { type: [Number, String], required: true }
  },

  data: () => ({
    loading: true,
    groups: [] as Group[]
  }),

  computed: {
    canEdit(): boolean {
      return true;
    },

    maxCategoryLength(): number {
      const append = (this as any).isVisible ? 1 : 0;
      if (this.groups.length == 0) return 0 + append;

      return (
        Math.max.apply(null, this.groups.map(g => g.categories.length)) + append
      );
    }
  },

  methods: {
    async fetchGroups() {
      this.loading = true;

      this.groups = await fetchCategories({
        competition_id: this.cm,
        discipline_id: this.discipline
      });

      this.loading = false;
    },

    async checkVisibility() {
      return await DisciplineAuth.canEdit(this.discipline, this.cm);
    }
  },

  created() {
    this.log = this.$logger.component(this);
    this.fetchGroups();
  }
});
</script>

<template>
  <div id="discipline-groups">
    <el-table v-loading="loading"
              :data="groups"
              :show-header="false"
              border>
      <el-table-column fixed
                       width="350">
        <template slot-scope="group">
          <GroupShortText :group="group.row" />&nbsp;
          <ManageGroupLink :cm="cm"
                           :discipline="discipline"
                           :group="group.row.id"
                           title="Edit group"
                           type="primary"
                           icon="edit"
                           button
                           mini
                           circle />
        </template>
      </el-table-column>

      <el-table-column v-for="i in maxCategoryLength"
                       :key="i">
        <template slot-scope="group">
          <div v-if="group.row.categories[i - 1]">
            <CategoryShortText :category="group.row.categories[i - 1]" />&nbsp;
            <ManageCategoryLink :cm="cm"
                                :discipline="discipline"
                                :group="group.row.id"
                                :category="group.row.categories[i - 1].id"
                                title="Edit category"
                                type="primary"
                                icon="edit"
                                button
                                mini
                                circle />
          </div>
          <div v-else>
            <CreateCategoryLink :cm="cm"
                                :discipline="discipline"
                                :group="group.row.id"
                                title="Create category"
                                type="success"
                                icon="plus"
                                button
                                mini
                                circle />
          </div>
        </template>
      </el-table-column>
    </el-table>

    <CreateGroupLink :cm="cm"
                     :discipline="discipline"
                     title="Create group"
                     type="success"
                     icon="plus"
                     button
                     mini
                     circle />

    <router-view></router-view>
  </div>
</template>
