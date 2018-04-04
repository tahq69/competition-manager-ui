<script lang="ts">
import Vue from "vue";

import Events from "@/helpers/events";
import { Id, Next } from "@/typings";

import { Category } from "../../models/category";
import { Group } from "../../models/group";
import {
  createCategoryRoute,
  createCmGroup,
  manageCategoryRoute,
  manageCmGroupRoute
} from "../routes";
import groupService from "../service";

export default Vue.extend({
  name: "ManageGroups",

  beforeRouteEnter(to, from, next: Next<any>) {
    const payload = {
      competition_id: to.params.cm,
      discipline_id: to.params.discipline
    };

    groupService
      .fetchGroups(payload)
      .then(groups => next(vm => vm.setGroups(groups)));
  },

  props: {
    cm: { type: [Number, String], required: true },
    discipline: { type: [Number, String], required: true }
  },

  data() {
    return {
      groups: [] as Group[]
    };
  },

  methods: {
    createGroupRoute() {
      return createCmGroup({
        cm: this.cm,
        discipline: this.discipline
      });
    },

    editGroupRoute(group: Group) {
      return manageCmGroupRoute({
        cm: this.cm,
        discipline: this.discipline,
        group: group.id
      });
    },

    createCategoryRoute(group: Group) {
      return createCategoryRoute({
        cm: this.cm,
        discipline: this.discipline,
        group: group.id
      });
    },

    editCategoryRoute(group: Group, category: Category) {
      return manageCategoryRoute({
        cm: this.cm,
        discipline: this.discipline,
        group: group.id,
        category: category.id
      });
    },

    async setGroups(groups: Group[]): Promise<void> {
      this.groups = groups;

      const pool = groups.reduce<Array<Promise<void>>>((acc, group) => {
        acc.push(this.fetchCategories(group));
        return acc;
      }, []);

      await Promise.all(pool);
    },

    async fetchCategories(group: Group): Promise<void> {
      const categories = await groupService.fetchCategories({
        competition_id: group.competition_id,
        discipline_id: group.discipline_id,
        category_group_id: group.id
      });

      group.categories = categories;
    },

    onGroupSaved(group: Group) {
      const existing = this.groups.filter(
        g => g.id.toString() === group.id.toString()
      );

      // If item does not exist in grid, add it.
      if (existing.length === 0) {
        this.groups.push(group);
        return;
      }

      // If exists, update it's value.
      Object.assign(existing[0], group, { categories: existing[0].categories });
    },

    onGroupDeleted(id: Id) {
      for (let i = this.groups.length - 1; i >= 0; --i) {
        if (this.groups[i].id.toString() === id.toString()) {
          this.groups.splice(i, 1);
        }
      }
    },

    onCategorySaved(category: Category) {
      const group = this.findGroup(category.category_group_id);

      const existing = group.categories.filter(
        c => c.id.toString() === category.id.toString()
      );

      // If item does not exist in grid, add it.
      if (existing.length === 0) {
        group.categories.push(category);
        return;
      }

      // If exists, update it's value.
      Object.assign(existing[0], category);
    },

    onCategoryDeleted(groupId: Id, categoryId: Id) {
      const group = this.findGroup(groupId);

      for (let i = group.categories.length - 1; i >= 0; --i) {
        if (group.categories[i].id.toString() === categoryId.toString()) {
          group.categories.splice(i, 1);
        }
      }
    },

    findGroup(id: Id) {
      return this.groups.filter(g => g.id.toString() === id.toString())[0];
    }
  },

  created() {
    Events.$on("cm:category:deleted", this.onCategoryDeleted);
    Events.$on("cm:category:saved", this.onCategorySaved);
    Events.$on("cm:group:deleted", this.onGroupDeleted);
    Events.$on("cm:group:saved", this.onGroupSaved);
  }
});
</script>

<template>
  <div>
    <div class="table-responsive">
      <table class="table table-bordered table-sm">
        <tr v-for="group in groups" :key="group.id">
          <td>
            <router-link
              :to="editGroupRoute(group)"
              :title="group.longText"
              v-html="group.shortText"
              class="btn btn-light btn-sm btn-block"
            />
          </td>

          <td
            v-for="category in group.categories"
            :key="category.id"
          >
            <router-link
              :to="editCategoryRoute(group, category)"
              :title="category.longText"
              v-html="category.shortText"
              class="btn btn-light btn-sm btn-block"
            />
          </td>

          <td>
            <router-link
              :to="createCategoryRoute(group)"
              :title="'Add new category'"
              class="btn btn-light btn-sm btn-block"
            >
              <i class="fa fa-plus-square-o"></i>
            </router-link>
          </td>
        </tr>
        <tr>
          <td>
            <router-link
              :to="createGroupRoute()"
              :title="'Add new group'"
              class="btn btn-light btn-sm btn-block"
            >
              <i class="fa fa-plus-square-o"></i>
            </router-link>
          </td>
        </tr>
      </table>
    </div>

    <router-view></router-view>
  </div>
</template>
