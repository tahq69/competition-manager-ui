import Vue from "vue"

import Entity from "@/Components/Entity"
import { IRoute } from "@/Router/Routes"

interface IDictionary<T> {
  [key: string]: T
}

export default class Paging<T extends Entity> {
  public $vm: Vue
  public $page: number
  public $perPage: number
  public $direction: string
  public $sort: string
  public selected: T
  public show: number
  public disabledClass: string
  public activeClass: string
  public route: IRoute
  public loading: boolean
  public items: T[]
  public lastPage: number

  constructor(
    vm: Vue,
    {
      route,
      activeClass = "active",
      disabledClass = "disabled",
      show = 5,
      sortBy = "id",
      sortDirection = "asc",
    },
  ) {
    this.lastPage = 0
    this.items = []
    this.loading = true
    this.route = route
    this.activeClass = activeClass
    this.disabledClass = disabledClass
    this.show = show
    this.selected = null

    this.$sort = vm.$route.params.sort || sortBy
    this.$direction = vm.$route.params.direction || sortDirection
    this.$perPage = parseInt(vm.$route.params.perpage, 10) || 15
    this.$page = parseInt(vm.$route.params.page, 10) || 1

    this.$vm = vm
  }

  public get urlParams(): IDictionary<string> {
    return {
      sort_by: this.$sort,
      sort_direction: this.$direction,
      per_page: this.$perPage.toString(),
      page: this.$page.toString(),
    }
  }

  public async init(callback) {
    await callback()
    this.$vm.$watch("$route.params", async (newValues, oldValues) => {
      if (!this.isPagingParamsChanged(newValues, oldValues)) return

      // update current paging values
      this.$page = parseInt(newValues.page, 10)
      this.$perPage = parseInt(newValues.perpage, 10) || 15
      this.$direction = newValues.direction || "asc"
      this.$sort = newValues.sort || "id"

      // call callback after data in paging object was updated
      await callback()
    })
  }

  public startLoading() {
    this.loading = true
  }

  public setSort(value) {
    // TODO: mutate route
    this.$sort = value
  }

  public setDirection(value) {
    // TODO: mutate route
    this.$direction = value
  }

  public rowClasses(item, extra = {}) {
    return {
      "with-hidden-actions": true,
      [this.activeClass]: this.selected && this.selected.id === item.id,
      ...extra,
    }
  }

  public select(item) {
    this.selected = item
  }

  public update({
    currentPage = 0,
    lastPage = 0,
    perPage = 0,
    items = [],
    loading = false,
  }) {
    this.$page = currentPage
    this.$perPage = perPage
    this.lastPage = lastPage
    this.items = items
    this.loading = loading

    // this will allow return to page where we last time left
    this.route.params
      ? (this.route.params.page = this.$page)
      : (this.route.params = { page: this.$page })
  }

  private isPagingParamsChanged(a, b) {
    return (
      a.page !== b.page ||
      a.sort !== b.sort ||
      a.direction !== b.direction ||
      a.perpage !== b.perpage
    )
  }
}
