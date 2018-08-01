<script lang="ts">
import Vue from "vue";

import { ElForm, Rules, Rule, Id } from "@/typings";
import { required, date, alphaDashSpace } from "@/helpers/validators";

import { ManageCompetition } from "#/competitions/models";
import { fetchCompetition, saveCompetition } from "#/competitions/service";

import AreasLink from "#/competitions/components/links/AreasLink.vue";
import CompetitionLink from "#/competitions/components/links/CompetitionLink.vue";
import CompetitionsLink from "#/competitions/components/links/CompetitionsLink.vue";
import DisciplinesLink from "#/competitions/components/links/DisciplinesLink.vue";
import ManageCompetitionsLink from "#/competitions/components/links/ManageCompetitionsLink.vue";

export default Vue.extend({
  name: "ManageCompetitionDetails",

  components: {
    AreasLink,
    CompetitionLink,
    CompetitionsLink,
    DisciplinesLink,
    ManageCompetitionsLink
  },

  props: {
    cm: { type: [Number, String], required: true }
  },

  data: () => ({
    loading: true,
    form: new ManageCompetition(),
    errors: {},
    title: ""
  }),

  computed: {
    formRef(): ElForm {
      return this.$refs["form"] as any;
    },

    rules(): Rules<ManageCompetition> {
      return {
        ambulance: [],
        cooperation: [],
        equipment: [],
        invitation: [],
        organization_date: [required("Please enter organization date")],
        price: [],
        prizes: [],
        program: [],
        registration_till: [
          required("Please enter last day of the registration")
        ],
        rules: [],
        subtitle: [
          required("Please enter subtitle"),
          alphaDashSpace(
            "Subtitle may contain only characters, numbers and spaces"
          )
        ],
        title: [
          required("Please enter the title"),
          alphaDashSpace(
            "Title may contain only characters, numbers and spaces"
          )
        ]
      };
    }
  },

  methods: {
    async fetchData() {
      this.loading = true;

      const competition = await fetchCompetition({ id: this.cm });
      this.form = competition;
      this.title = String(competition.title);

      this.loading = false;
    },

    async save() {
      if (this.loading) return;

      this.loading = true;
      this.errors = {};

      this.log("save()", this.form);

      this.formRef.validate(async valid => {
        if (!valid) {
          this.loading = false;
          return false;
        }

        try {
          const team = await saveCompetition(this.form);
          this.$notify.success("Competition details updated");
          this.loading = false;
        } catch (errors) {
          this.loading = false;
          this.errors = errors;
        }
      });
    }
  },

  created() {
    this.log = this.$logger.component(this);
    this.fetchData();
  }
});
</script>

<template>
  <el-card id="manage-competition">
    <div slot="header"
         class="clearfix">
      <span>{{ title }}</span>
      <ManageCompetitionsLink icon="tickets"
                              button
                              mini>
        Manage competitions
      </ManageCompetitionsLink>

      <CompetitionsLink icon="tickets"
                        button
                        mini>
        Competitions
      </CompetitionsLink>

      <CompetitionLink :cm="cm"
                       icon="view"
                       button
                       mini>
        Preview
      </CompetitionLink>

      <DisciplinesLink :cm="cm"
                       icon="tickets"
                       button
                       mini>
        Disciplines
      </DisciplinesLink>

      <AreasLink :cm="cm"
                 icon="tickets"
                 button
                 mini>
        Areas
      </AreasLink>
    </div>

    <el-form v-loading="loading"
             :model="form"
             :rules="rules"
             ref="form"
             :label-position="_config.label_position"
             :label-width="_config.label_width"
             @submit.native.prevent="save">
      <el-form-item label="Title"
                    :error="errors.title"
                    prop="title">
        <el-input v-model="form.title"
                  type="text"
                  name="title"
                  placeholder="Title"
                  autofocus
                  clearable />
      </el-form-item>

      <el-form-item label="Subtitle"
                    :error="errors.subtitle"
                    prop="subtitle">
        <el-input v-model="form.subtitle"
                  type="text"
                  name="subtitle"
                  placeholder="Subtitle"
                  clearable />
      </el-form-item>

      <el-form-item label="Registration till"
                    :error="errors.registration_till"
                    prop="registration_till">
        <el-date-picker v-model="form.registration_till"
                        type="datetime"
                        name="registration_till"
                        placeholder="Registration till">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="Organization date"
                    :error="errors.organization_date"
                    prop="organization_date">
        <el-date-picker v-model="form.organization_date"
                        type="datetime"
                        name="organization_date"
                        placeholder="Organization date">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="Cooperation"
                    :error="errors.cooperation"
                    prop="cooperation">
        <el-input v-model="form.cooperation"
                  type="textarea"
                  autosize
                  name="cooperation"
                  placeholder="Cooperation">
        </el-input>
      </el-form-item>

      <el-form-item label="Invitation"
                    :error="errors.invitation"
                    prop="invitation">
        <el-input v-model="form.invitation"
                  type="textarea"
                  autosize
                  name="invitation"
                  placeholder="Invitation">
        </el-input>
      </el-form-item>

      <el-form-item label="Program"
                    :error="errors.program"
                    prop="program">
        <el-input v-model="form.program"
                  type="textarea"
                  autosize
                  name="program"
                  placeholder="Program">
        </el-input>
      </el-form-item>

      <el-form-item label="Rules"
                    :error="errors.rules"
                    prop="rules">
        <el-input v-model="form.rules"
                  type="textarea"
                  autosize
                  name="rules"
                  placeholder="Rules">
        </el-input>
      </el-form-item>

      <el-form-item label="Ambulance"
                    :error="errors.ambulance"
                    prop="ambulance">
        <el-input v-model="form.ambulance"
                  type="textarea"
                  autosize
                  name="ambulance"
                  placeholder="Ambulance">
        </el-input>
      </el-form-item>

      <el-form-item label="Prizes"
                    :error="errors.prizes"
                    prop="prizes">
        <el-input v-model="form.prizes"
                  type="textarea"
                  autosize
                  name="prizes"
                  placeholder="Prizes">
        </el-input>
      </el-form-item>

      <el-form-item label="Equipment"
                    :error="errors.equipment"
                    prop="equipment">
        <el-input v-model="form.equipment"
                  type="textarea"
                  autosize
                  name="equipment"
                  placeholder="Equipment">
        </el-input>
      </el-form-item>

      <el-form-item label="Price"
                    :error="errors.price"
                    prop="price">
        <el-input v-model="form.price"
                  type="textarea"
                  autosize
                  name="price"
                  placeholder="Price">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   native-type="submit">
          Save
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
