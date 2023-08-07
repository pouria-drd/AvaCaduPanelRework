import { createRouter, createWebHistory } from "vue-router";

const staticUserPath = "/user-account";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      meta: { requiresAuth: false },
      component: () => import("../views/LoginView.vue"),
    },

    {
      name: "confirmCode",
      path: "/confirm-code",
      meta: { requiresAuth: false },
      component: () => import("../views/ConfirmCodeView.vue"),
    },

    {
      name: "home",
      path: staticUserPath + "/home",
      meta: { requiresAuth: true },
      component: () => import("../views/HomeView.vue"),
    },

    {
      name: "card-to-card",
      path: staticUserPath + "/card-to-card",
      meta: { requiresAuth: true },
      component: () => import("../views/CardToCardView.vue"),
    },

    {
      name: "credits-list",
      path: staticUserPath + "/credits-list",
      meta: { requiresAuth: true },
      component: () => import("../views/CreditsListView.vue"),
    },

    {
      name: "avacadu",
      path: staticUserPath + "/avacadu",
      meta: { requiresAuth: true },
      component: () => import("../views/AvacaduView.vue"),
    },

    {
      name: "album",
      path: staticUserPath + "/album",
      meta: { requiresAuth: true },
      component: () => import("../views/AlbumView.vue"),
    },

    {
      name: "playground",
      path: "/playground",
      meta: { requiresAuth: false },
      component: () => import("../views/PlaygroundView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Check if user is authenticated (token is in sessionStorage)
  const isAuthenticated = sessionStorage.getItem("bearer") ? true : false;

  // If user is trying to access a requiresAuth route and is not authenticated,
  // save the next URL in localStorage and redirect to login page
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Save the next URL in localStorage
    // localStorage.setItem("nextUrl", to.fullPath);
    // Redirect to login page
    next({ name: "login" });
  } else {
    // If none of the above conditions are met, allow the user to access the requested route
    next();
  }
});

export default router;
