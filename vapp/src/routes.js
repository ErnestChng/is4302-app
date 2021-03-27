import Home from "./components/pages/home/Home";
import Login from "./components/pages/login/Login";
import Validator from "./components/pages/validator/Validator";
import AllocateCredits from "./components/pages/validator/AllocateCredits";
import ReportEmissions from "./components/pages/validator/ReportEmissions";
import GetCredits from "./components/pages/validator/GetCredits";
import Regulator from "./components/pages/regualator/Regulator";
import CreateUser from "./components/pages/regualator/CreateUser";
import CheckViolators from "./components/pages/regualator/CheckViolators";
import Consumer from "./components/pages/consumer/Consumer";
import ConsumerProfile from "./components/pages/consumer/ConsumerProfile";
import ConsumerMarket from "./components/pages/consumer/ConsumerMarket";
import Generator from "./components/pages/generator/Generator";
import GeneratorProfile from "./components/pages/generator/GeneratorProfile";
import GeneratorMarket from "./components/pages/generator/GeneratorMarket";
import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/validator', component: Validator},
    {path: '/validator/allocate-credits', component: AllocateCredits},
    {path: '/validator/report-emissions', component: ReportEmissions},
    {path: '/validator/get-credits', component: GetCredits},
    {path: '/regulator', component: Regulator},
    {path: '/regulator/create-user', component: CreateUser},
    {path: '/regulator/check-violators', component: CheckViolators},
    {path: '/consumer', component: Consumer},
    {path: 'consumer/consumer-profile', component: ConsumerProfile},
    {path: 'consumer/consumer-market', component: ConsumerMarket},
    {path: '/generator', component: Generator},
    {path: 'generator/generator-profile', component: GeneratorProfile},
    {path: 'generator/generator-market', component: GeneratorMarket}
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

export default router;