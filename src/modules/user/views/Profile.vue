<script lang="ts">
import Vue from "vue";

import { Next } from "@/typings";
import ImageCard from "@/components/cards/ImageCard.vue";

import userService from "#/user/service";
import { Profile } from "#/user/models/profile";
import { ProfileTeam } from "#/user/models/profile-team";

import TeamLink from "#/teams/components/TeamLink.vue";

export default Vue.extend({
  name: "Profile",

  components: { ImageCard, TeamLink },

  props: {
    user: { type: String, required: false },
    default: { type: String, default: "mm" },
    domain: { type: String, default: "http://www.gravatar.com" },
    size: { type: Number, default: 255 }
  },

  data: () => ({
    loading: false,
    profile: new Profile({ md5: "" })
  }),

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
    async fetchProfile() {
      this.loading = true;

      var profile = await userService.fetchUserProfile({ id: this.user });
      this.profile = profile;

      this.loading = false;
    }
  },

  created() {
    this.log = this.$logger.component(this);
    this.fetchProfile();
  }
});
</script>

<template>
  <el-row id="user-profile"
          v-loading="loading">
    <el-col :sm="12"
            :md="8"
            :lg="6">
      <ImageCard>
        <img :src="imageUrl"
             slot="image"
             alt="avatar">

        <h5 class="card-header">{{ profile.name }}</h5>
        <ul class="team-list">
          <li class="team-item"
              v-for="team in profile.teams"
              :key="team.id">
            <TeamLink :team="team.id"
                      :title="team.name"
                      class="team-thumbnail">
              <img :src="team.logo || teamDefault"
                   class="team-img" />
            </TeamLink>
          </li>
        </ul>
      </ImageCard>
    </el-col>

    <el-col :sm="12"
            :md="16"
            :lg="18">
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
    </el-col>
  </el-row>
</template>

<style lang="scss">
@import "~assets/variables";

#user-profile {
  .team-img {
    width: 100%;
    display: block;
  }

  .team-list {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    margin: -0.25em;

    .team-item {
      display: flex;
      width: 25%;

      .team-thumbnail {
        padding: 0.25em;

        .team-img:hover {
          box-shadow: $--box-shadow-light;
        }
      }
    }
  }
}
</style>
