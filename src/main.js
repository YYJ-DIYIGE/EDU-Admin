import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import QuillEditor from "vue-quill-editor";
Vue.use(QuillEditor);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
