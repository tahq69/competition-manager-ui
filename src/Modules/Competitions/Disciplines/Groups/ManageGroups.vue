<script lang="ts">
import Vue from "vue"

import Events from "@/Helpers/Events"
import { Id, Next } from "@/types"

import { Category } from "./Category"
import { Group } from "./Group"
import GroupText from "./GroupText.vue"
import CategoryFrom from "./ManageCategoryForm.vue"
import GroupFrom from "./ManageGroupForm.vue"
import groupService from "./Service"

export default Vue.extend({
  name: "ManageGroups",

  components: { CategoryFrom, GroupFrom, GroupText },

  beforeRouteEnter(to, from, next: Next<any>) {
    const payload = {
      competition_id: to.params.cm,
      discipline_id: to.params.discipline,
    }
    groupService
      .fetchGroups(payload)
      .then(groups => next(vm => vm.setGroups(groups)))
  },

  props: {
    cm: { type: [Number, String], required: true },
    discipline: { type: [Number, String], required: true },
  },

  data() {
    return {
      groups: [] as Group[],
      groupId: 0 as Id,
      categoryId: 0 as Id,
      showGroupForm: false,
      showCategoryForm: false,
    }
  },

  methods: {
    async setGroups(groups: Group[]): Promise<void> {
      this.groups = groups

      const pool = groups.reduce<Array<Promise<void>>>((acc, group) => {
        acc.push(this.fetchCategories(group))
        return acc
      }, [])

      await Promise.all(pool)
    },

    async fetchCategories(group: Group): Promise<void> {
      const categories = await groupService.fetchCategories({
        competition_id: group.competition_id,
        discipline_id: group.discipline_id,
        category_group_id: group.id,
      })

      group.categories = categories
    },

    createGroup() {
      this.showGroupForm = true
      this.showCategoryForm = false
      this.groupId = 0
      this.categoryId = 0
    },

    createCategory(group: Group) {
      this.showGroupForm = false
      this.showCategoryForm = true
      this.groupId = group.id
      this.categoryId = 0
    },

    editGroup(id: Id) {
      this.showGroupForm = true
      this.showCategoryForm = false
      this.groupId = id
      this.categoryId = 0
    },

    editCategory(groupId: Id, categoryId: Id) {
      this.showGroupForm = false
      this.showCategoryForm = true
      this.groupId = groupId
      this.categoryId = categoryId
    },

    onGroupSaved(group: Group) {
      this.showGroupForm = false
      const existing = this.groups.filter(
        g => g.id.toString() === group.id.toString(),
      )

      // If item does not exist in grid, add it.
      if (existing.length === 0) {
        this.groups.push(group)
        return
      }

      // If exists, update it's value.
      Object.assign(existing[0], group, { categories: existing[0].categories })
    },

    onGroupDeleted(id: Id) {
      this.showGroupForm = false
      for (let i = this.groups.length - 1; i >= 0; --i) {
        if (this.groups[i].id.toString() === id.toString()) {
          this.groups.splice(i, 1)
        }
      }
    },

    onCategorySaved(groupId: Id, category: Category) {
      this.showGroupForm = false
      const group = this.findGroup(groupId)

      const existing = group.categories.filter(
        c => c.id.toString() === category.id.toString(),
      )

      // If item does not exist in grid, add it.
      if (existing.length === 0) {
        group.categories.push(category)
        return
      }

      // If exists, update it's value.
      Object.assign(existing[0], category)
    },

    onCategoryDeleted(groupId: Id, categoryId: Id) {
      this.showCategoryForm = false
      const group = this.findGroup(groupId)

      for (let i = group.categories.length - 1; i >= 0; --i) {
        if (group.categories[i].id.toString() === categoryId.toString()) {
          group.categories.splice(i, 1)
        }
      }
    },

    findGroup(id: Id) {
      return this.groups.filter(g => g.id.toString() === id.toString())[0]
    },
  },

  created() {
    Events.$on("cm:category:deleted", this.onCategoryDeleted)
    Events.$on("cm:category:saved", this.onCategorySaved)
    Events.$on("cm:group:deleted", this.onGroupDeleted)
    Events.$on("cm:group:saved", this.onGroupSaved)
  },
})
</script>

<template>
  <div>
    <div class="table-responsive">
      <table class="table table-bordered table-sm">
        <tr v-for="group in groups" :key="group.id">
          <td>
            <button
              @click="editGroup(group.id)"
              class="btn btn-light btn-sm btn-block"
            >
              <GroupText
                :group="group"
                :short="true"
              />
            </button>
          </td>

          <td
            v-for="category in group.categories"
            :key="category.id"
          >
            <button
              @click="editCategory(group.id, category.id)"
              class="btn btn-light btn-sm btn-block"
            >
              {{ category.shortText }}
            </button>
          </td>

          <td>
            <button
              @click="createCategory(group)"
              class="btn btn-light btn-sm btn-block"
            >
              <i class="fa fa-plus-square-o"></i>
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <button
              @click="createGroup"
              class="btn btn-light btn-sm btn-block"
            >
              <i class="fa fa-plus-square-o"></i>
            </button>
          </td>
        </tr>
      </table>
    </div>

    <GroupFrom
      v-if="showGroupForm" :cm="cm"
      :discipline="discipline" :group="groupId"
      @saved="onGroupSaved" @deleted="onGroupDeleted"
    />

    <CategoryFrom
      v-if="showCategoryForm" :cm="cm"
      :discipline="discipline" :group="groupId" :category="categoryId"
      @saved="onCategorySaved" @deleted="onCategoryDeleted"
    />
  </div>
</template>
