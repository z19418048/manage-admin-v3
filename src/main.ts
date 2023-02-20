import { createApp, h } from "vue";
import TDesign from "tdesign-vue-next";
import App from "./App.vue";
import router from "@/router";
// 引入组件库全局样式资源
import "tdesign-vue-next/dist/reset.css";
import "tdesign-vue-next/es/style/index.css";
import "@/assets/less/base.less";
import { createPinia } from "pinia";
import pinaPluginPersistedstate from "pinia-plugin-persistedstate";
import { permissionDirective } from "@/directives/permission";
import { plugin } from "echarts-for-vue";
import * as echarts from "echarts";

//持久层pina引用
const pina = createPinia();
pina.use(pinaPluginPersistedstate);

const app = createApp(App);

app.use(router);
app.use(TDesign);
app.use(createPinia());
app.use(pina);
app.use(plugin, { echarts, h });
app.directive("permissions", permissionDirective);
app.mount("#app");
