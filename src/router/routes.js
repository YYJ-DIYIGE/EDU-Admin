import RoutesCommon from "./routesCommon.js";
import RoutesPermission from "./routesPermission.js";
import userService from "../gloabl/request/api";
import DataStore from "../gloabl/storage/index";
const userinfo = DataStore.getUserInfo();
const id = userinfo.role_id;
const matcAllRouter = [
  {
    path: "*",
    redirect: { name: "Error404" }
  }
];
const filterPermissionRoutes = (routes, permissions) => {
  const filterRoutes = [];
  routes.forEach(data => {
    const route = { ...data };
    const notPermission = !route.permission;
    const hasPermission = permissions.includes(route.permission);
    const passPermission = notPermission || hasPermission;
    let hasPath = true;
    if (route.children) {
      route.children = filterPermissionRoutes(data.children, permissions);
      if (route.children.length === 0) {
        hasPath = false;
      }
    }
    if (passPermission && hasPath) {
      filterRoutes.push(route);
    }
  });
  return filterRoutes;
};
export const fetchFilterPermissionRoutes = async () => {
  const permission = await userService.permissions_slug(id);
  const routes = RoutesPermission;
  return filterPermissionRoutes(routes, permission).concat(matcAllRouter);
};
export const commonRoutes = RoutesCommon;
export default RoutesPermission.concat(RoutesCommon);
