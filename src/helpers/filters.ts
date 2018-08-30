import Vue from "vue";

import { config } from "@/config";
import { formatDate } from "@/helpers/utils";

Vue.filter("formatDate", (value: string) =>
  formatDate(value, config.date_format)
);

Vue.filter("formatDateTime", (value: string) =>
  formatDate(value, config.date_time_format)
);
