<script lang="ts">
import { createPaging } from "crip-vue-bootstrap"
import Vue from "vue"

import { TeamMember } from "../../team-member"
import membersService from "../service"

const { mixin, paging: members } = createPaging<TeamMember>((paging, to) => {
  return membersService.fetchTeamMembers({ paging, team_id: to.params.team })
})

export default Vue.extend({
  name: "TeamMembers",

  props: {
    team: { type: [String, Number], required: true },
  },

  mixins: [mixin],

  data: () => ({ members }),

  computed: {
    hasMembers(): boolean {
      return this.members.items.length > 0
    },
  },

  methods: {
    hasProfile(member: TeamMember) {
      return (member.user_id || 0) > 0
    },
  },

  mounted() {
    this.log = this.$logger.component(this)
  },
})
</script>

<template>
  <div id="team-members">
    <div class="card-body py-0">
      <CRow>
        <table v-if="hasMembers"
               class="table mb-0 table-hover">
          <thead>
            <tr>
              <CGridHeader :paging="members"
                           column="name"
                           title="Sort by name">
                Name
              </CGridHeader>

              <CGridHeader :paging="members"
                           column="membership_type"
                           title="Sort by membership">
                Membership
              </CGridHeader>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in members.items"
                :key="member.id"
                class="crip-table-row">
              <td>
                {{ member.name }} &nbsp;
                <router-link :to="member.routes.profile"
                             v-if="hasProfile(member)"
                             class="badge badge-light actions"
                             title="Member profile">
                  Profile
                </router-link>
              </td>
              <td>{{ member.membership_type }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else
             class="py-3 py-3 col text-danger">
          This team does not have any member.
        </div>
      </CRow>
    </div>

    <div v-if="hasMembers"
         class="card-footer">
      <CRow>
        <CCol class="clearfix">
          <CPagination :paging="members"
                       class="float-left mb-0"></CPagination>
          <CPerPage :paging="members"
                    class="float-right"></CPerPage>
        </CCol>
      </CRow>
    </div>
  </div>
</template>