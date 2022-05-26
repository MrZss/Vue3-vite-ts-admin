import { createApp } from 'vue'
import routes from './router'
import store from './store'
import App from './App.vue'

import "./style/index.scss";

const app = createApp(App);
app.use(store);
app.use(routes).mount('#app');
