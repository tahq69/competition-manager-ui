<script lang="ts">
import Vue from "vue";

import { LocalStorage, newGuid } from "@/helpers";

import filesys from "./filesys";

export default Vue.extend({
  name: "FilesysIframe",

  props: {
    size: {
      type: String,
      required: false,
      validator: (value: string) =>
        ["thumb", "xs", "sm", "md", "lg"].indexOf(value) > -1
    },
    type: {
      type: String,
      required: false,
      validator: (value: string) =>
        ["document", "image", "media", "file"].indexOf(value) > -1
    }
  },

  data() {
    const id = newGuid();
    const token = LocalStorage.get("access_token");

    return { id, token };
  },

  computed: {
    url(): string {
      const baseUrl = "/packages/filemanager";
      let url = `${baseUrl}?target=callback&id=${this.id}`;

      if (this.type) url += `&type=${this.type}`;
      if (this.size) url += `&select=${this.size}`;

      return url;
    }
  },

  created() {
    this.log = this.$logger.component(this);
  },

  mounted() {
    filesys.register(this.id, (url: string) => this.$emit("input", url));

    const iframe = this.$refs.iframe as HTMLIFrameElement;
    const xhr = new XMLHttpRequest();

    xhr.open("GET", this.url);
    xhr.onreadystatechange = handler;
    xhr.responseType = "text";
    xhr.setRequestHeader("Authorization", `Bearer ${this.token}`);
    xhr.send();

    function handler(this: XMLHttpRequest, ev: Event) {
      if (this.readyState === this.DONE && iframe.contentWindow) {
        if (this.status === 200) {
          iframe.contentWindow.document.open("text/htmlreplace");
          iframe.contentWindow.document.write(this.response);
          iframe.contentWindow.document.close();
        } else throw new Error("Could not load filemanager content");
      }
    }
  }
});
</script>

<template>
  <iframe ref="iframe"
          class="filesys-iframe"
          width="100%"
          height="500px"></iframe>
</template>

<style lang="scss">
.filesys-iframe {
  border: 0;
}
</style>
