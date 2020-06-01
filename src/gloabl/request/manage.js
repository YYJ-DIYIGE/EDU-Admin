import API from "./router";
import request from "./axios";
export default {
  create(params) {
    return request.post(API.manage, params);
  },
  index() {
    return request.get(API.manage);
  },
  editshow(id) {
    return request.get(API.manageID(id));
  },
  update(id, params) {
    return request.put(API.manageID(id), params);
  },
  delete(id) {
    return request.delete(API.manageID(id));
  }
};
