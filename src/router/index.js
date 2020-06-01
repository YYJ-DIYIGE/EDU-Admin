import Vue from "vue";
import Router from "vue-router";
import DataStoer from "../gloabl/storage/index";
import { fetchFilterPermissionRoutes, commonRoutes } from "./routes";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";
Vue.use(Router);

const appRouter = new Router({
  mode: "history",
  routes: commonRoutes
});
appRouter.hasAddRouter = false;
appRouter.beforeEach(async (to, from, next) => {
  const TOKEN = DataStoer.getToken();
  if (!TOKEN && to.name !== "ManageLogin") {
    next({ name: "ManageLogin", replace: true });
    return;
  }
  if (TOKEN) {
    if (!appRouter.hasAddRouter) {
      const filterRoutes = await fetchFilterPermissionRoutes();
      appRouter.hasAddRouter = true;
      appRouter.addRoutes(filterRoutes);
      // 确保路由已经添加完成
      next({ ...to, replace: true });
      return;
    }
    if (to.name === "ManageLogin") {
      next({ name: "Root", replace: true });
      return;
    }
  }
  next();
});
// appRouter.afterEach((to, from) => {
//   NProgress.done();
// });
export default appRouter;
