import Vue from "vue"

import Notification from "./Notification.vue"

type types = "info" | "success" | "warning" | "error" | "normal"

export default class NotificationWrapper {
  public duration = 4.5
  public top = 64

  private instance
  private key = 0

  private icons = {
    info: "info-circle",
    success: "check-circle",
    warning: "exclamation-circle",
    error: "times-circle",
  }

  constructor() {
    this.instance = false
  }

  public create(properties) {
    if (this.instance) {
      this.instance.closeAll()
      setTimeout(() => {
        const element = document.getElementsByClassName("crip-notice")[0]
        document.body.removeChild(element)
      }, 500)
    }

    const defaults = {
      styles: {
        top: `${this.top}px`,
        right: `0px`,
      },
    }
    const data = Object.assign(defaults, properties)

    const instance = new Vue({
      data,
      render(h) {
        return h(Notification, { props: data })
      },
    })

    const component = instance.$mount()
    document.body.appendChild(component.$el)
    this.instance = instance.$children[0]
  }

  public notice(type: types, options) {
    const { title, description, uuid, onClose, duration } = Object.assign(
      {
        title: "",
        description: "",
        uuid: `crip-notice-key-${++this.key}`,
        onClose: () => null,
        duration: this.duration,
      },
      options,
    )

    let content

    const with_desc = description === "" ? "" : ` crip-notice-with-desc`

    if (type === "normal") {
      content = `
        <div class="crip-notice-custom-content
                    crip-notice-with-normal${with_desc}">
          <div class="crip-notice-title">${title}</div>
          <div class="crip-notice-desc">${description}</div>
        </div>
      `
    } else {
      content = `
        <div class="crip-notice-custom-content
                    crip-notice-with-icon
                    crip-notice-with-${type}${with_desc}">
          <span class="crip-notice-icon crip-notice-icon-${type}">
            <i class="fa fa-${this.icons[type]}"></i>
          </span>
          <div class="crip-notice-title">${title}</div>
          <div class="crip-notice-desc">${description}</div>
        </div>
      `
    }

    this.instance.add({
      name: uuid.toString(),
      duration,
      styles: {},
      transitionName: "move-notice",
      content,
      onClose,
      closable: true,
      type: "notice",
    })
  }

  public remove(name) {
    this.instance.remove(name)
  }
}
