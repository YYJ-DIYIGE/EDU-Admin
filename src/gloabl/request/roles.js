import API from "./router";
import request from "./axios";
export default {
  permissions() {
    return request.get(API.permissions);
  },
  create(params) {
    return request.post(API.role, params);
  },
  index() {
    return request.get(API.role);
  },
  editshow(id) {
    return request.get(API.roleId(id));
  },
  update(id, params) {
    return request.put(API.roleId(id), params);
  },
  delete(id) {
    return request.delete(API.roleId(id));
  }
};
