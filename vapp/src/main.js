import Vue from 'vue';
import App from './App.vue';
import store from "./store";
import router from "./routes";
import Toasted from 'vue-toasted';

import drizzleVuePlugin from '@drizzle/vue-plugin';
import drizzleOptions from "@/drizzleOptions";

Vue.use(drizzleVuePlugin, {store, drizzleOptions});
Vue.use(Toasted); // TODO: can consider vuenotification or other toast

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
