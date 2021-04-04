import Vue from 'vue';
import App from './App.vue';
import store from "./store";
import routes from "./routes.js";
import VueRouter from "vue-router";
import Toasted from 'vue-toasted';
import firebase from "firebase";

import drizzleVuePlugin from '@drizzle/vue-plugin';
import drizzleOptions from "@/drizzleOptions";

Vue.use(VueRouter);
Vue.use(drizzleVuePlugin, {store, drizzleOptions});
Vue.use(Toasted); // TODO: can consider vuenotification or other toast

Vue.config.productionTip = false;

// Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC8FLGJNqsEMOwO30ndAQ9qJOFSYfgqVzw",
    authDomain: "is4302-app.firebaseapp.com",
    databaseURL: "https://is4302-app-default-rtdb.firebaseio.com",
    projectId: "is4302-app",
    storageBucket: "is4302-app.appspot.com",
    messagingSenderId: "455622780080",
    appId: "1:455622780080:web:0bd1c184210a5c70634775",
    measurementId: "G-1F2J8YSJXJ"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(user => {
    store.dispatch("fetchUser", user);
});

// router
const router = new VueRouter({
    mode: 'history',
    routes: routes
});
// export default router;

new Vue({
    render: h => h(App),
    router: router,
    store: store
}).$mount('#app');
