import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },

    {
      path: "/confirm-code",
      name: "confirmCode",
      component: () => import("../views/ConfirmCodeView.vue"),
    },

    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },

    {
      path: "/wallet",
      name: "wallet",
      component: () => import("../views/WalletView.vue"),
    },

    {
      path: "/avacadu",
      name: "avacadu",
      component: () => import("../views/AvacaduView.vue"),
    },

    {
      path: "/album",
      name: "album",
      component: () => import("../views/AlbumView.vue"),
    },

    {
      path: "/playground",
      name: "playground",
      component: () => import("../views/PlaygroundView.vue"),
    },
  ],
});

export default router;
