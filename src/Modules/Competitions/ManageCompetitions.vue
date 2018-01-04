<script lang="ts">
import { Paging } from "crip-vue-bootstrap"
import Vue from "vue"
import { Location } from "vue-router"

import { createCompetition, manageCompetitions } from "@/Router/Routes"

import { Competition } from "./Competition"
import competitionService from "./Service"

export default Vue.extend({
  name: "ManageCompetitions",

  data() {
    return {
      createRoute: createCompetition,
      paging: new Paging<Competition>(this, { route: manageCompetitions as Location }),
    }
  },

  methods: {
    async fetchPage() {
      const pagination = await competitionService.fetchCompetitions({
        paging: this.paging,
        owned: true,
      })

      this.paging.update(pagination)
    },
  },

  created() {
    this.paging.init(() => this.fetchPage())
  },

  mounted() {
    this.log = this.$logger.component(this)
  },
})
</script>

<template>
  <CGrid id="manage-competitions"
         :paging="paging">
    <span slot="title">{{ $t('competitions.manage_competitions_grid_title') }}</span>
    <CPanelAction slot="actions"
                  :to="createRoute">
      {{ $t('competitions.manage_competitions_grid_head_create_new') }}
    </CPanelAction>

    <table class="table table-hover">
      <thead>
        <tr>
          <CGridHeader :paging="paging"
                       column="id"
                       :title="$t('competitions.manage_competitions_grid_head_id_title')">
            {{ $t('competitions.manage_competitions_grid_head_id_text') }}
          </CGridHeader>

          <CGridHeader :paging="paging"
                       column="title"
                       :title="$t('competitions.manage_competitions_grid_head_title_title')">
            {{ $t('competitions.manage_competitions_grid_head_title_text') }}
          </CGridHeader>

          <CGridHeader :paging="paging"
                       column="judge_name"
                       :title="$t('competitions.manage_competitions_grid_head_judge_name_title')">
            {{ $t('competitions.manage_competitions_grid_head_judge_name_text') }}
          </CGridHeader>

          <CGridHeader :paging="paging"
                       column="organization_date"
                       :title="$t('competitions.manage_competitions_grid_head_organization_date_title')">
            {{ $t('competitions.manage_competitions_grid_head_organization_date_text') }}
          </CGridHeader>
        </tr>
      </thead>
      <tbody>
        <template v-for="competition in paging.items">
          <tr @click="paging.select(competition)"
              :class="paging.classes(competition)"
              :key="competition.id">
            <td>{{ competition.id }}</td>
            <td>{{ competition.title }} &nbsp;
              <router-link :to="competition.routes.edit"
                           class="label label-info actions"
                           :title="$t('competitions.manage_competitions_grid_btn_edit_title')">
                <i class="fa fa-pencil-square-o"></i>
                {{ $t('competitions.manage_competitions_grid_btn_edit_text') }}
              </router-link>
            </td>
            <td>{{ competition.judge_name }}</td>
            <td>{{ competition.organization_date }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </CGrid>
</template>
