<script lang="ts">
import Vue from "vue"
import { Location } from "vue-router"

import { manageCompetitionDisciplineGroups } from "@/Router/Routes"
import { Id, Next } from "@/types"

import { Category } from "./Category"
import { Group } from "./Group"
import groupService from "./Service"

export default Vue.extend({
  name: "DisciplineGroups",

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
      canCreate: false,
      groups: [] as Group[],
      categories: [] as number[],
      maxCategoryLength: 0,
    }
  },

  computed: {
    canEdit(): boolean {
      return true
    },

    manageGroupsRoute(): Location {
      const cm = this.cm.toString()
      const discipline = this.discipline.toString()

      return {
        ...manageCompetitionDisciplineGroups,
        params: { cm, discipline },
      }
    },
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

      group.setCategories(categories)

      if (categories.length > this.maxCategoryLength) {
        this.maxCategoryLength = categories.length
        this.categories = []
        categories.map(category => this.categories.push(category.order))
      }
    },
  },
})
</script>

<template>
  <CCol id="discipline-groups"
        :class="`discipline discipline-${discipline}`">
    <router-link v-if="canEdit"
                 :to="manageGroupsRoute"
                 class="btn btn-link btn-edit btn-sm">
      <i class="fa fa-pencil-square-o"></i>
      Edit
    </router-link>

    <table class="table">
      <tr v-for="group in groups" :key="group.id">
        <td v-for="orderNr in categories" :key="orderNr">
          <div v-if="group.hasCategory(orderNr)">
            {{ group.getCategory(orderNr) }}
          </div>
        </td>
      </tr>
    </table>
  </CCol>
</template>

<style lang="scss">
.discipline {
  position: relative;

  .btn-edit {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
