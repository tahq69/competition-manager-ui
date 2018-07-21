import * as routes from "@/router/routes";

export function createTabsMixin(defaultRouteName: string) {
  return {
    data(this: any) {
      return {
        routes,
        activeTab: defaultRouteName,
        defaultRoute: defaultRouteName
      };
    },

    watch: {
      "$route.name"(this: any, newRouteName: string, oldRouteName: string) {
        this.log("TabsMixin::watch::$route.name", {
          newRouteName,
          oldRouteName
        });

        this.activeTab = newRouteName;
      }
    },

    created(this: any) {
      this.log = this.$logger.component(this);
      this.activeTab = this.$route.name || this.defaultRoute;
    }
  };
}
