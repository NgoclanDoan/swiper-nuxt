import Vue from "vue";

Vue.component("w-link", () =>
  import("@/components/global/Link" /* webpackChunkName: "base" */)
);
Vue.component("w-button", () =>
  import("@/components/global/Button" /* webpackChunkName: "base" */)
);
Vue.component("w-icon", () =>
  import("@/components/global/Icon" /* webpackChunkName: "base" */)
);
