import Vue from "vue"

function formatDate(date: Date, format = "D MMMM YYYY"): string {
  // TODO: formats and month should be moved to localization
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  return format
    .replace("YYYY", year.toString())
    .replace("MMMM", monthNames[monthIndex])
    .replace("MMMM", (monthIndex + 1).toString())
    .replace("D", day.toString())
}

Vue.filter("formatDate", (value: string) => {
  if (value) {
    const date = new Date(value)
    return formatDate(date)
  }
})
