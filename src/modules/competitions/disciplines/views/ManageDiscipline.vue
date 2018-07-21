<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";

import { Next } from "@/typings";
import {
  createCompetitionDiscipline as createRoute,
  manageCompetitionDiscipline as editRoute
} from "@/router/routes";

import { Discipline } from "#/competitions/models/discipline";
import { fetchDiscipline } from "#/competitions/disciplines/service";
import { cmDisciplineRoute } from "#/competitions/disciplines/routes";

import DisciplineLink from "#/competitions/components/links/DisciplineLink.vue";
import DisciplinesLink from "#/competitions/components/links/DisciplinesLink.vue";

export default Vue.extend({
  name: "ManageDiscipline",

  components: { DisciplineLink, DisciplinesLink },

  props: {
    cm: { type: [Number, String], required: true },
    discipline: { type: [Number, String], required: false }
  },

  beforeRouteEnter(to, from, next: Next<any>) {
    // If we open create route, we have no data to load from API.
    if (to.name === createRoute.name) return next();

    // If we open edit route, we have to load data from API.
    const payload = { competition_id: to.params.cm, id: to.params.discipline };

    fetchDiscipline(payload).then(discipline =>
      next(vm => vm.setDiscipline(discipline))
    );
  },

  data() {
    return {
      disciplineTitle: "",
      form: new Discipline({
        competition_id: this.cm,
        title: "",
        short: "",
        type: "",
        game_type: "",
        description: ""
      })
      /*typeSelect: new CripSelect({
        options: [
          { key: "1", text: "Kickboxing", value: "KICKBOXING" },
          { key: "2", text: "Box", value: "BOXING" }
        ]
      }),
      categoryTypeSelect: new CripSelect({
        options: [
          { key: "1", text: "Age", value: "AGE" },
          { key: "2", text: "Weight", value: "WEIGHT" }
        ]
      })*/
    };
  },

  computed: {
    isEdit(): boolean {
      return this.$route.name === editRoute.name;
    },

    title(): string {
      if (this.isEdit) return `Manage discipline: ${this.disciplineTitle}`;
      return "Create new discipline";
    }
  },

  methods: {
    setDiscipline(discipline: Discipline): void {
      this.disciplineTitle = discipline.title;
      this.form = discipline;
    },

    async save() {
      this.log("save()", this.form);

      /*try {
        const saved = await disciplineService.saveDiscipline(this.form);

        this.$notify.success("Discipline saved");

        if (!this.isEdit) {
          // Redirect only when we create new discipline.
          const payload = { cm: this.cm, discipline: saved.id };
          const route = cmDisciplineRoute(payload);

          this.$router.push(route);
        }
      } catch (errors) {
        this.log("save(errors)", errors);
      }*/
    }
  },

  mounted() {
    this.log = this.$logger.component(this);
  }
});
</script>

<template>
  <CFormCard :title="title"
             id="manage-discipline"
             @submit="save">
    <span slot="actions">
      <DisciplinesLink :cm="cm"
                       btn="light"
                       arrow="left"
                       icon>
        Disciplines
      </DisciplinesLink>

      <DisciplineLink v-if="isEdit"
                      :cm="cm"
                      :discipline="discipline"
                      icon="eye"
                      button
                      mini>
        Preview
      </DisciplineLink>
    </span>

    <!-- #title -->
    <CFormGroup for="title"
                :form="form"
                label="Title">
      <input type="text"
             id="title"
             v-model="form.data.title"
             name="title"
             :class="[{'is-invalid': form.errors.title}, 'form-control']">
    </CFormGroup>

    <!-- #short -->
    <CFormGroup for="short"
                :form="form"
                label="Short title">
      <input type="text"
             id="short"
             v-model="form.data.short"
             name="short"
             :class="[{'is-invalid': form.errors.short}, 'form-control']">
    </CFormGroup>

    <!-- #type -->
    <CFormGroup for="type"
                :form="form"
                label="Type">

      <crip-select id="type"
                   :settings="typeSelect"
                   v-model="form.data.type"
                   :class="{'is-invalid': form.errors.type}" />
    </CFormGroup>

    <!-- #category_group_type -->
    <CFormGroup for="category_group_type"
                :form="form"
                label="Group Type">

      <crip-select id="category_group_type"
                   :settings="categoryTypeSelect"
                   v-model="form.data.category_group_type"
                   :disabled="isEdit"
                   :class="{'is-invalid': form.errors.category_group_type}" />
    </CFormGroup>

    <!-- #category_type -->
    <CFormGroup for="category_type"
                :form="form"
                label="Category Type">

      <crip-select id="category_type"
                   :settings="categoryTypeSelect"
                   v-model="form.data.category_type"
                   :disabled="isEdit"
                   :class="{'is-invalid': form.errors.category_type}" />
    </CFormGroup>

    <!-- #game_type -->
    <CFormGroup for="game_type"
                :form="form"
                label="Game type">

      <textarea id="game_type"
                v-model="form.data.game_type"
                :class="[{'is-invalid': form.errors.game_type}, 'form-control']"
                rows="8"></textarea>
    </CFormGroup>

    <!-- #description -->
    <CFormGroup for="description"
                :form="form"
                label="Description">

      <textarea id="description"
                v-model="form.data.description"
                :class="[{'is-invalid': form.errors.description}, 'form-control']"
                rows="8"></textarea>
    </CFormGroup>

    <!-- #submit -->
    <CFormGroup>
      <button id="submit"
              type="submit"
              class="btn btn-primary">
        Save
      </button>
    </CFormGroup>
  </CFormCard>
</template>
