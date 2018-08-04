<script lang="ts">
import Vue from "vue";

import { ElForm, Rules, Rule, Id } from "@/typings";
import { required, date, alphaDashSpace } from "@/helpers/validators";

import { ManageDiscipline } from "#/competitions/models";
import {
  fetchDiscipline,
  saveDiscipline
} from "#/competitions/disciplines/service";
import { cmDisciplineRoute } from "#/competitions/disciplines/routes";

import CompetitionLink from "#/competitions/components/links/CompetitionLink.vue";
import DisciplineLink from "#/competitions/components/links/DisciplineLink.vue";
import DisciplinesLink from "#/competitions/components/links/DisciplinesLink.vue";

export default Vue.extend({
  name: "ManageDiscipline",

  components: { CompetitionLink, DisciplineLink, DisciplinesLink },

  props: {
    cm: { type: [Number, String], required: true },
    discipline: { type: [Number, String], required: false }
  },

  data: () => ({
    loading: true,
    form: new ManageDiscipline(),
    errors: {},
    title: "",
    typeOptions: [
      { key: "1", label: "Kickboxing", value: "KICKBOXING" },
      { key: "2", label: "Box", value: "BOXING" }
    ],
    categoryTypeOptions: [
      { key: "1", label: "Age", value: "AGE" },
      { key: "2", label: "Weight", value: "WEIGHT" }
    ]
  }),

  computed: {
    formRef(): ElForm {
      return this.$refs["form"] as any;
    },

    rules(): Rules<ManageDiscipline> {
      return {
        category_group_type: [],
        category_type: [],
        competition_id: [],
        description: [required("Please enter description")],
        game_type: [required("Please enter details")],
        short: [
          required("Please enter short discipline title"),
          alphaDashSpace(
            "Short title may contain only characters, numbers and spaces"
          )
        ],
        title: [
          required("Please enter discipline title"),
          alphaDashSpace(
            "Title may contain only characters, numbers and spaces"
          )
        ],
        type: []
      };
    }
  },

  methods: {
    async fetchData() {
      // if we create new discipline, there has no data to fetch from server.
      if (!this.discipline) {
        this.loading = false;
        this.title = "Create new discipline";

        return;
      }

      this.loading = true;

      const payload = { competition_id: this.cm, id: this.discipline };
      const discipline = await fetchDiscipline(payload);

      this.form = discipline;
      this.title = String(discipline.title);

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
          const saved = await saveDiscipline({
            ...this.form,
            id: this.discipline,
            competition_id: this.cm
          });

          this.$notify.success("Discipline saved");

          // redirect only when we create new discipline.
          if (!this.discipline) {
            const payload = { cm: saved.competition_id, discipline: saved.id };
            const route = cmDisciplineRoute(payload);

            this.$router.push(route);
          }

          this.loading = false;
        } catch (errors) {
          this.loading = false;
          this.errors = errors;
        }
      });
    }
  },

  mounted() {
    this.log = this.$logger.component(this);
    this.fetchData();
  }
});
</script>

<template>
  <el-card>
    <div slot="header"
         class="clearfix">
      <span>{{ title }}</span>
      <CompetitionLink :cm="cm"
                       icon="view"
                       button
                       mini>
        Competition
      </CompetitionLink>

      <DisciplineLink v-if="discipline"
                      :cm="cm"
                      :discipline="discipline"
                      icon="view"
                      button
                      mini>
        Preview
      </DisciplineLink>

      <DisciplinesLink :cm="cm"
                       icon="tickets"
                       button
                       mini>
        Disciplines
      </DisciplinesLink>
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

      <el-form-item label="Short title"
                    :error="errors.short"
                    prop="short">
        <el-input v-model="form.short"
                  type="text"
                  name="short"
                  placeholder="Short title"
                  clearable />
      </el-form-item>

      <el-form-item label="Type"
                    :error="errors.type"
                    prop="type">
        <el-select v-model="form.type"
                   :disabled="!!discipline"
                   placeholder="Select discipline type">
          <el-option v-for="item in typeOptions"
                     :key="item.key"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Group Type"
                    :error="errors.category_group_type"
                    prop="category_group_type">
        <el-select v-model="form.category_group_type"
                   :disabled="!!discipline"
                   placeholder="Select discipline group type">
          <el-option v-for="item in categoryTypeOptions"
                     :key="item.key"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Category Type"
                    :error="errors.category_type"
                    prop="category_type">
        <el-select v-model="form.category_type"
                   :disabled="!!discipline"
                   placeholder="Select discipline category type">
          <el-option v-for="item in categoryTypeOptions"
                     :key="item.key"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Game type"
                    :error="errors.game_type"
                    prop="game_type">
        <el-input v-model="form.game_type"
                  type="textarea"
                  autosize
                  name="game_type"
                  placeholder="Game type">
        </el-input>
      </el-form-item>

      <el-form-item label="Description"
                    :error="errors.description"
                    prop="description">
        <el-input v-model="form.description"
                  type="textarea"
                  autosize
                  name="description"
                  placeholder="Description">
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
