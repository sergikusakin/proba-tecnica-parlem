import "./main.css";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/aura-light-green/theme.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";

import { IProductServiceKey } from "./services/IProductService";
import { MockProductService } from "./services/MockProductService";

import { ICustomerServiceKey } from "./services/ICustomerService";
import { MockCustomerService } from "./services/MockCustomerService";

const app = createApp(App);
app.provide(IProductServiceKey, new MockProductService());
app.provide(ICustomerServiceKey, new MockCustomerService());

app.use(router);
app.use(PrimeVue);

app.mount("#app");
