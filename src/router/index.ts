import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "../pages/LayoutPages.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    children: [
      {
        path: "/home",
        name: "home",
        alias:"/",
        component: () =>
          import(/* webpackChunkName: "homePage" */ "../pages/HomePage.vue"),
      },
      {
        path: "/reservar",
        name: "reserve",
        alias:"/",
        component: () =>
          import(/* webpackChunkName: "reservePages" */ "../pages/ReservePages.vue"),
      },
      {
        path: "/minhas-reservas",
        name: "reservations",
        alias:"/",
        component: () =>
          import(/* webpackChunkName: "reservationsPages" */ "../pages/ReservationsPages.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
