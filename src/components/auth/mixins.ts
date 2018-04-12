import { IState } from "@/store/typings";

export const watchIsVisible = {
  data: () => ({ isVisible: false }),

  created() {
    const component: any = this;
    if (
      component.checkVisibility &&
      typeof component.checkVisibility === "function"
    ) {
      component.$store.watch(
        (state: IState) => state.auth.user.authenticated,
        (newValue: boolean, oldValue: boolean) => {
          if (!newValue) {
            // if user log out, make all components invisible.
            component.isVisible = false;
          } else {
            // otherwyse just recheck visibility as this may be initial public
            // view load and auth status arrives later than component is mounted
            component.checkVisibility().then((isVisible: boolean) => {
              component.isVisible = isVisible;
            });
          }
        }
      );
    }
  },

  mounted() {
    const component: any = this;
    if (
      component.checkVisibility &&
      typeof component.checkVisibility === "function"
    ) {
      component.checkVisibility().then((isVisible: boolean) => {
        component.isVisible = isVisible;
      });
    }
  }
};
