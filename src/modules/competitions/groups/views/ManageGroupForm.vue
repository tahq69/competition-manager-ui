<script lang="ts">
import Vue from "vue";

import {
  alphaDashSpace,
  date,
  positiveInt,
  required
} from "@/helpers/validators";
import { emitEvent } from "@/helpers";
import { ElForm, Rules, Rule, Id } from "@/typings";

import {
  fetchGroup,
  saveGroup,
  deleteGroup
} from "@/modules/competitions/groups/service";
import { Group, ManageGroup } from "@/modules/competitions/models";
import { cmGroups } from "@/modules/competitions/groups/routes";

export default Vue.extend({
  name: "ManageGroupForm",

  props: {
    cm: { type: [String, Number], required: true },
    discipline: { type: [String, Number], required: true },
    group: { type: [String, Number], required: false }
  },

  data: () => ({
    isVisible: true,
    loading: true,
    errors: {},
    form: new ManageGroup()
  }),

  computed: {
    formRef(): ElForm {
      return this.$refs["form"] as any;
    },

    rules: (): Rules<ManageGroup> => ({
      max: [
        required("Please enter maximum available value"),
        positiveInt("Value must be positive number")
      ],
      min: [
        required("Please enter minimum available value"),
        positiveInt("Value must be positive number")
      ],
      rounds: [
        required("Please enter rounds count"),
        positiveInt("Value must be positive number")
      ],
      time: [required("Please enter one round duration")],
      short: [
        required("Please enter short name of the group"),
        alphaDashSpace(
          "Short name may contain only characters, numbers and spaces"
        )
      ],
      title: [
        required("Please enter title of the group"),
        alphaDashSpace("Title may contain only characters, numbers and spaces")
      ]
    })
  },

  methods: {
    async fetchData() {
      if (!this.group) {
        // If properties does not contain group identifier, this means we now
        // are in create mode and we have no need to fetch any data from api.
        this.loading = false;
        this.reset();

        return;
      }

      this.loading = true;

      const group = await fetchGroup({
        id: this.group,
        competition_id: this.cm,
        discipline_id: this.discipline
      });

      this.update(group);

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
          const group = await saveGroup({
            id: this.group,
            competition_id: this.cm,
            discipline_id: this.discipline,
            ...this.form
          });

          // Notify user that group now is saved sucessfilly.
          this.$notify.success("Group sucessfully saved");

          // emit event to be available update child views.
          emitEvent("cm:group:saved", group);
          this.goToGroups();
        } catch (errors) {
          this.errors = errors;
        } finally {
          this.loading = false;
        }
      });
    },

    async destroy() {
      await deleteGroup({
        id: this.group,
        competition_id: this.cm,
        discipline_id: this.discipline
      });

      // Emit event to be available update child views.
      emitEvent("cm:group:deleted", this.group);
      this.goToGroups();
    },

    reset() {
      this.errors = {};
      this.form.max = 0;
      this.form.min = 0;
      this.form.rounds = 0;
      this.form.short = "";
      this.form.time = 0;
      this.form.title = "";
    },

    update(group: Group) {
      this.errors = {};
      this.form.max = group.max;
      this.form.min = group.min;
      this.form.rounds = group.rounds;
      this.form.short = group.short;
      this.form.time = group.time;
      this.form.title = group.title;
    },

    goToGroups() {
      this.$router.push(cmGroups({ cm: this.cm, discipline: this.discipline }));
    }
  },

  created() {
    this.log = this.$logger.component(this);
    this.fetchData();
  },

  watch: {
    cm: "fetchData",
    discipline: "fetchData",
    group: "fetchData",
    isVisible(newValue) {
      if (!newValue) {
        // If user manually closes model, redirect user back to the groups view.
        this.goToGroups();
      }
    }
  }
});
</script>

<template>
  <el-dialog :visible.sync="isVisible">
    <el-form v-loading="loading"
             :model="form"
             :rules="rules"
             ref="form"
             :label-position="_config.label_position"
             :label-width="_config.label_width"
             @submit.native.prevent="save"
             id="manage-group">

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

      <el-form-item label="Short"
                    :error="errors.short"
                    prop="short">
        <el-input v-model="form.short"
                  type="text"
                  name="short"
                  placeholder="Short"
                  clearable />
      </el-form-item>

      <el-form-item label="Rounds"
                    :error="errors.rounds"
                    prop="rounds">
        <el-input-number v-model="form.rounds"
                         controls-position="right"
                         :min="1" />
      </el-form-item>

      <el-form-item label="Round time"
                    :error="errors.time"
                    prop="time">
        <el-input-number v-model="form.time"
                         controls-position="right"
                         :min="1" />
      </el-form-item>

      <el-form-item label="Minimum value"
                    :error="errors.min"
                    prop="min">
        <el-input-number v-model="form.min"
                         controls-position="right"
                         :min="1" />
      </el-form-item>

      <el-form-item label="Maximum value"
                    :error="errors.max"
                    prop="max">
        <el-input-number v-model="form.max"
                         controls-position="right"
                         :min="1" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   native-type="submit">
          Save
        </el-button>

        <el-button v-if="group > 0"
                   type="danger"
                   @click="destroy">
          Delete
        </el-button>
      </el-form-item>

    </el-form>
  </el-dialog>
</template>
