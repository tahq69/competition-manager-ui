<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";
import { Paging, createPaging } from "crip-vue-bootstrap";

import ManageCompetitionBtn from "#/competitions/components/ManageCompetitionBtn.vue";

import { Competition } from "../models/competition";
import competitionService from "../service";

const { mixin, paging: competitions } = createPaging<Competition>(
  (paging, to) => competitionService.fetchCompetitions({ paging, owned: true })
);

export default Vue.extend({
  name: "ManageCompetitions",

  components: { ManageCompetitionBtn },

  mixins: [mixin],

  data: () => ({ competitions }),

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <CCol>
    <CGrid id="manage-competitions"
           :paging="competitions">
      <span slot="title">{{ $t('competitions.manage_competitions_grid_title') }}</span>

      <table class="table table-hover">
        <thead>
          <tr>
            <CGridHeader :paging="competitions"
                         column="id"
                         :title="$t('competitions.manage_competitions_grid_head_id_title')">
              {{ $t('competitions.manage_competitions_grid_head_id_text') }}
            </CGridHeader>

            <CGridHeader :paging="competitions"
                         column="title"
                         :title="$t('competitions.manage_competitions_grid_head_title_title')">
              {{ $t('competitions.manage_competitions_grid_head_title_text') }}
            </CGridHeader>

            <CGridHeader :paging="competitions"
                         column="judge_name"
                         :title="$t('competitions.manage_competitions_grid_head_judge_name_title')">
              {{ $t('competitions.manage_competitions_grid_head_judge_name_text') }}
            </CGridHeader>

            <CGridHeader :paging="competitions"
                         column="organization_date"
                         :title="$t('competitions.manage_competitions_grid_head_organization_date_title')">
              {{ $t('competitions.manage_competitions_grid_head_organization_date_text') }}
            </CGridHeader>
          </tr>
        </thead>
        <tbody>
          <template v-for="competition in competitions.items">
            <tr @click="competitions.select(competition)"
                :class="competitions.classes(competition)"
                :key="competition.id">
              <td>{{ competition.id }}</td>
              <td>{{ competition.title }} &nbsp;
                <ManageCompetitionBtn :cm="competition.id"
                                      :title="$t('competitions.manage_competitions_grid_btn_edit_title')"
                                      badge>
                  {{ $t('competitions.manage_competitions_grid_btn_edit_text') }}
                </ManageCompetitionBtn>
              </td>
              <td>{{ competition.judge_name }}</td>
              <td>{{ competition.organization_date }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </CGrid>
  </CCol>
</template>
