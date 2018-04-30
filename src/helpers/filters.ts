import Vue from "vue";
import { DateTime } from "luxon";

import config from "@/config";

Vue.filter("formatDate", (value: string) => {
  if (value) {
    return DateTime.fromISO(value).toLocaleString(config.dateFormat);
  }
});

Vue.filter("formatDateTime", (value: string) => {
  if (value) {
    return DateTime.fromISO(value).toLocaleString(config.dateTimeFormat);
  }
});
