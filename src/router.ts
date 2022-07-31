import { createRouter, createWebHistory } from "vue-router";
import makeRoom from "./components/makeRoom.vue";
import wikiPage from "./components/wikiPage.vue";
const routes = [
  { path: "/", name: "makeRoom", component: makeRoom },
  { path: "/game", name: "wikiPage", component: wikiPage },
];

const router = createRouter({
  history: createWebHistory(), // HTML5 History モード
  routes,
});

export default router;
