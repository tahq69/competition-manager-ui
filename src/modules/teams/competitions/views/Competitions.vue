<script lang="ts">
import { createPaging } from "crip-vue-bootstrap";
import Vue from "vue";

import ManageCompetitionBtn from "#/competitions/components/ManageCompetitionBtn.vue";

import cmService from "#/competitions/service";
import { Competition } from "#/competitions/models/competition";
import { cmDetailsRoute } from "#/competitions/details/routes";

const { mixin, paging: competitions } = createPaging<Competition>(
  (paging, to) => {
    return cmService.fetchTeamCompetitions({ paging, team_id: to.params.team });
  }
);

export default Vue.extend({
  name: "TeamCompetitions",

  components: { ManageCompetitionBtn },

  props: {
    team: { type: [String, Number], required: true }
  },

  mixins: [mixin],

  data: () => ({ competitions }),

  computed: {
    hasCm(): boolean {
      return this.competitions.items.length > 0;
    }
  },

  methods: {
    competitionDetailsRoute(cm: Competition) {
      return cmDetailsRoute({ cm: cm.id });
    }
  },

  mounted() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <div id="team-competitions">
    <div class="card-body py-0">
      <CRow>
        <table v-if="hasCm"
               class="table table-hover mb-0">
          <thead>
            <tr>
              <CGridHeader :paging="competitions"
                           column="title"
                           title="Sort by title">
                Title
              </CGridHeader>

              <CGridHeader :paging="competitions"
                           column="judge_name"
                           title="Sort by main judge">
                Judge
              </CGridHeader>

              <CGridHeader :paging="competitions"
                           column="organization_date"
                           title="Sort by organization date">
                Organization date
              </CGridHeader>
            </tr>
          </thead>
          <tbody>
            <router-link v-for="cm in competitions.items"
                         :key="cm.id"
                         tag="tr"
                         :to="competitionDetailsRoute(cm)"
                         class="c-pointer">
              <td>
                <span>{{ cm.title }}</span>
                &nbsp;
                <ManageCompetitionBtn :cm="cm.id"
                                      title="Edit competition details"
                                      badge>
                  Edit
                </ManageCompetitionBtn>
              </td>
              <td>{{ cm.judge_name }}</td>
              <td>{{ cm.organization_date | formatDate }}</td>
            </router-link>
          </tbody>
        </table>
        <div v-else
             class="py-3 py-3 col text-danger">
          This team does not have any competition.
        </div>
      </CRow>
    </div>

    <div v-if="hasCm"
         class="card-footer">
      <CRow>
        <CCol class="clearfix">
          <CPagination :paging="competitions"
                       class="float-left mb-0"></CPagination>
          <CPerPage :paging="competitions"
                    class="float-right"></CPerPage>
        </CCol>
      </CRow>
    </div>
  </div>
</template>
