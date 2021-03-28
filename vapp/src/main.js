import Vue from 'vue';
import App from './App.vue';
import Router from "./routes";
import Store from "./store";

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router: Router,
    store: Store
}).$mount('#app');
