<script lang="ts">
import Vue from "vue";

import { Id } from "@/typings";
import { onEvent } from "@/helpers";
import { visibility } from "@/components/mixins";

import { Category, Group } from "@/modules/competitions/models";
import { fetchCategories } from "@/modules/competitions/groups/service";
import { DisciplineAuth } from "@/modules/competitions/disciplines/auth";

import GroupText from "@/modules/competitions/components/GroupText.vue";
import CategoryText from "@/modules/competitions/components/CategoryText.vue";

export default Vue.extend({
  name: "DisciplineGroups",

  mixins: [visibility],

  components: { GroupText, CategoryText },

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
    },

    onGroupSaved(group: Group) {
      const existing = this.findGroup(group.id);

      // If this record does not exist in current view, it means that it is new
      // one and we should add it.
      if (!existing) {
        this.groups.push(group);
        return;
      }

      // Override all incoming properties except categories as they do not come
      // from server on record update.
      Object.assign(existing, group, { categories: existing.categories });
    },

    onGroupDeleted(id: Id) {
      this.groups.forEach((group, index) => {
        if (group.id.toString() === id.toString()) {
          this.groups.splice(index, 1);
        }
      });
    },

    onCategorySaved(category: Category) {
      const group = this.findGroup(category.category_group_id);
      const existing = group.categories.filter(
        c => c.id.toString() === category.id.toString()
      )[0];

      // If this record does not exist in current view, it means that it is new
      // one and we should add it.
      if (!existing) {
        group.categories.push(category);
        return;
      }

      // If exists, update it's value.
      Object.assign(existing, category);
    },

    onCategoryDeleted(categoryId: Id, groupId: Id) {
      this.log("onCategoryDeleted", { categoryId, groupId });
      const group = this.findGroup(groupId);
      group.categories.forEach((c, index) => {
        if (c.id.toString() === categoryId.toString()) {
          group.categories.splice(index, 1);
        }
      });
    },

    findGroup(id: Id) {
      return this.groups.filter(g => g.id.toString() === id.toString())[0];
    }
  },

  created() {
    this.log = this.$logger.component(this);
    onEvent("cm:group:saved", this.onGroupSaved);
    onEvent("cm:group:deleted", this.onGroupDeleted);
    onEvent("cm:category:saved", this.onCategorySaved);
    onEvent("cm:category:deleted", this.onCategoryDeleted);
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
          <GroupText :group="group.row" />&nbsp;
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
            <CategoryText :category="group.row.categories[i - 1]" />&nbsp;
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
