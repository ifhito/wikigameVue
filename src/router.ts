import { createRouter, createWebHistory } from "vue-router";
import MakeRoom from "./components/Pages/MakeRoom.vue";
import WikiPage from "./components/Pages/WikiPage.vue";
const routes = [
  { path: "/", name: "makeRoom", component: MakeRoom },
  { path: "/game", name: "wikiPage", component: WikiPage },
];

const router = createRouter({
  history: createWebHistory(), // HTML5 History モード
  routes,
});

export default router;
