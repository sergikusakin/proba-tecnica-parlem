import { createRouter, createWebHistory } from "vue-router";
import ClientListPage from "@/pages/ClientListPage.vue";
import ClientProductsPage from "@/pages/ClientProductsPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ClientListPage,
    },
    {
      path: "/customers/:id",
      name: "customers",
      component: ClientProductsPage,
    },
  ],
});

export default router;
