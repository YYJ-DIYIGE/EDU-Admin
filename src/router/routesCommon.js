import ManageLogin from "../views/ManageLogin.vue";
import Error404 from "../views/Error404.vue";
export default [
  {
    path: "/login",
    component: ManageLogin,
    name: "ManageLogin"
  },
  {
    path: "/404",
    name: "Error404",
    component: Error404
  }
];
