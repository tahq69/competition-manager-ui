<script lang="ts">
import Vue from "vue";

import { ElForm, Rules, Rule, Id } from "@/typings";
import { required, date, alphaDashSpace } from "@/helpers/validators";

import { ManageArea, areaTypeOptions } from "@/modules/competitions/models";
import { areaRoute } from "@/modules/competitions/areas/routes";
import { fetchArea, saveArea } from "@/modules/competitions/areas/service";
import { FetchAreaPayload } from "@/modules/competitions/areas/typings";

export default Vue.extend({
  name: "ManageArea",

  props: {
    cm: { type: [Number, String], required: true },
    area: { type: [Number, String], required: false }
  },

  data: () => ({
    loading: true,
    title: "",
    form: new ManageArea(),
    errors: {},
    typeOptions: areaTypeOptions
  }),

  computed: {
    formRef(): ElForm {
      return this.$refs["form"] as any;
    },

    rules: (): Rules<ManageArea> => ({
      description: [required("Please enter description")],
      nr: [required("Please enter area number")],
      title: [
        required("Please enter title"),
        alphaDashSpace("Title may contain only characters, numbers and spaces")
      ],
      type: [required("Please enter area type")]
    })
  },

  methods: {
    async fetchData() {
      // if we create new area, there has no data to fetch from server.
      if (!this.area) {
        this.loading = false;
        this.title = "Create new area";

        return;
      }

      this.loading = true;

      const area = await fetchArea({
        competition_id: this.cm,
        id: this.area
      });

      this.form = area;
      this.title = String(area.title);

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
          const saved = await saveArea({
            ...this.form,
            id: this.area,
            competition_id: this.cm
          });

          this.$notify.success("Area saved");

          // redirect only when we create new area.
          if (!this.area) {
            const payload = { cm: saved.competition_id, area: saved.id };
            const route = areaRoute(payload);

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

  created() {
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

      <AreaLink v-if="area"
                :cm="cm"
                :area="area"
                icon="view"
                button
                mini>
        Preview
      </AreaLink>

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

      <el-form-item label="Type"
                    :error="errors.type"
                    prop="type">
        <el-select v-model="form.type"
                   :disabled="!!area"
                   placeholder="Select area type">
          <el-option v-for="item in typeOptions"
                     :key="item.key"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
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
