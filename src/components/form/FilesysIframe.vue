<script lang="ts">
import Vue from "vue"

import Storage from "@/helpers/local-storage"
import Utils from "@/helpers/utils"

import filesys from "./filesys"

export default Vue.extend({
  name: "FilesysIframe",

  created() {
    this.log = this.$logger.component(this)
  },

  data() {
    const id = Utils.newGuid()
    const baseUrl = "/packages/filemanager"
    const token = Storage.get("access_token")
    const url = `${baseUrl}?target=callback&id=${id}`

    return { url, id, token }
  },

  mounted() {
    filesys.register(this.id, (url: string) => this.$emit("input", url))

    const iframe = this.$refs.iframe as HTMLIFrameElement
    const xhr = new XMLHttpRequest()

    xhr.open("GET", this.url)
    xhr.onreadystatechange = handler
    xhr.responseType = "text"
    xhr.setRequestHeader("Authorization", `Bearer ${this.token}`)
    xhr.send()

    function handler(this: XMLHttpRequest, ev: Event) {
      if (this.readyState === this.DONE) {
        if (this.status === 200) {
          iframe.contentWindow.document.open("text/htmlreplace")
          iframe.contentWindow.document.write(this.response)
          iframe.contentWindow.document.close()
        } else throw new Error("Could not load filemanager content")
      }
    }
  },
})
</script>


<template>
  <iframe ref="iframe"
          width="100%"
          height="500px"></iframe>
</template>
