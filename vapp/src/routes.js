import Home from "./views/home/Home";
import Login from "./views/login/Login";
import Validator from "./views/validator/Validator";
import AllocateCredits from "./views/validator/AllocateCredits";
import ReportEmissions from "./views/validator/ReportEmissions";
import GetCredits from "./views/validator/GetCredits";
import Regulator from "./views/regulator/Regulator";
import CreateUser from "./views/regulator/CreateUser";
import CheckViolators from "./views/regulator/CheckViolators";
import Consumer from "./views/consumer/Consumer";
import ConsumerProfile from "./views/consumer/ConsumerProfile";
import ConsumerMarket from "./views/consumer/ConsumerMarket";
import Generator from "./views/generator/Generator";
import GeneratorProfile from "./views/generator/GeneratorProfile";
import GeneratorMarket from "./views/generator/GeneratorMarket";


export default[
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
    {path: '/consumer/consumer-profile', component: ConsumerProfile},
    {path: '/consumer/consumer-market', component: ConsumerMarket},
    {path: '/generator', component: Generator},
    {path: '/generator/generator-profile', component: GeneratorProfile},
    {path: '/generator/generator-market', component: GeneratorMarket}
];
