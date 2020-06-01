import API from "./router";
import request from "./axios";
import DataStore from "../storage/index";
export default {
  manageLogin(params) {
    return request.post(API.manageLogin, params);
  },
  qiniuToken() {
    return request.get(API.qiniuToken);
  },
  accountLogout() {
    DataStore.clear();
  },
  permissions_slug(id) {
    return request.get(API.permissions_slug(id));
  }
};
