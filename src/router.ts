import { createRouter, createWebHistory } from "vue-router";
import makeRoom from "./components/Pages/makeRoom.vue";
import wikiPage from "./components/Pages/wikiPage.vue";
const routes = [
  { path: "/", name: "makeRoom", component: makeRoom },
  { path: "/game", name: "wikiPage", component: wikiPage },
];

const router = createRouter({
  history: createWebHistory(), // HTML5 History モード
  routes,
});

export default router;
