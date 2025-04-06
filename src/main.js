import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import './assets/styles/app.scss';

createApp(App)
  .use(store)
  .mount('#app')