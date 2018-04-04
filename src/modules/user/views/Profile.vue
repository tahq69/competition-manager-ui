<script lang="ts">
import Vue from "vue";

import { Next } from "@/types";

import { Profile } from "../models/profile";
import { ProfileTeam } from "../models/profile-team";
import userService from "../service";

import { teamRoute } from "@/modules/teams/routes";

export default Vue.extend({
  name: "Profile",

  props: {
    user: { type: String, required: false },
    default: { type: String, default: "mm" },
    domain: { type: String, default: "http://www.gravatar.com" },
    size: { type: Number, default: 255 }
  },

  beforeRouteEnter(to, from, next: Next<any>) {
    userService
      .fetchUserProfile({ id: to.params.user })
      .then(profile => next(vm => vm.setProfile(profile)));
  },

  data: () => ({ profile: new Profile({ md5: "" }) }),

  computed: {
    imageUrl(): string {
      let picture = `&d=${this.default}`;
      if (this.default === "gravatar") picture = "";

      return `${this.domain}/avatar/${this.profile.md5}?s=${
        this.size
      }${picture}`;
    },

    teamDefault(): string {
      return `${this.domain}/avatar?s=80`;
    }
  },

  methods: {
    setProfile(profile: Profile) {
      this.log("setProfile(profile)", { profile });
      this.profile = profile;
    },

    teamRoute: (team: ProfileTeam) => teamRoute({ team: team.id })
  },

  created() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <CRow id="user-profile">
    <CCol :sm="6"
          :md="4"
          :lg="3">
      <div class="card">
        <img :src="imageUrl"
             alt="avatar"
             class="card-img-top img-fluid">

        <div class="card-body">
          <h5 class="card-title">{{ profile.name }}</h5>
          <ul class="teams">
            <router-link tag="li"
                         v-for="team in profile.teams"
                         :key="team.id"
                         :to="teamRoute(team)"
                         :title="team.name"
                         class="team img-thumbnail">
              <img :src="team.logo || teamDefault"
                   class="img-responsive" />
            </router-link>
          </ul>
        </div>
      </div>
    </CCol>

    <CCol :sm="6"
          :md="8"
          :lg="9">
      <div class="card">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <!--<TeamLink :team="team"
                        class="nav-link" />-->
            </li>

            <li class="nav-item">
              <!--<TeamCompetitionsLink :team="team"
                                    class="nav-link" /> -->
            </li>
          </ul>
        </div>
        <!-- /.card-header -->

        <router-view></router-view>
      </div>
    </CCol>
  </CRow>
</template>

<style lang="scss">
#user-profile {
  .card-body .teams {
    list-style: none;
    padding: 0;
    margin: 0 -4px;

    .team {
      cursor: pointer;
      display: inline-block;
      max-width: 66px;
      height: 66px;
      padding-top: 33px;
      margin: 4px;

      &:hover {
        border-color: #007bff;
      }

      .img-responsive {
        transform: translateY(-50%);
        max-width: 100%;
        height: auto;
      }
    }
  }
}
</style>
