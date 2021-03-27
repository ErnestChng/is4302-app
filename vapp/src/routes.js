import Home from "./components/pages/Home";
import MarketPlace from "./components/pages/Market";

import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

const routes = [
    {path: '/', component: Home},
    {path: '/market', component: MarketPlace}
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

export default router;