import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.css";

import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import router from "./router";

const app = createApp(App);
app.config.globalProperties.$baseUrl = "https://api.avacadu.ir/";
app.use(router);

app.mount("#app");
