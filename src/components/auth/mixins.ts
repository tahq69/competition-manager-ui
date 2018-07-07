export const watchVisibility = {
  data: () => ({ isVisible: false }),

  methods: {
    __checkVisibility() {
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
  },

  created() {
    const component: any = this;
    component.$watch(
      () => component.$store.state.auth.user.authenticated,
      () => component.__checkVisibility()
    );
  },

  mounted() {
    const component: any = this;
    component.__checkVisibility();
  }
};
