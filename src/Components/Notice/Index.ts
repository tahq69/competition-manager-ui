import Notification from "./Notification"

class Notice {
  private notification: Notification

  constructor() {
    this.notification = new Notification()
    this.notification.create({})
  }

  public open(options) {
    return this.notification.notice("normal", options)
  }

  public info(options) {
    return this.notification.notice("info", options)
  }

  public success(options) {
    return this.notification.notice("success", options)
  }
  public warning(options) {
    return this.notification.notice("warning", options)
  }

  public error(options) {
    return this.notification.notice("error", options)
  }

  public config(options) {
    if (options.top) {
      this.notification.top = options.top
    }

    if (options.duration) {
      this.notification.duration = options.duration
    }
  }

  public close(noticeName) {
    if (noticeName) {
      this.notification.remove(noticeName)
    } else return false
  }
}

export default new Notice()
