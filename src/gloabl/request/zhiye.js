import API from "./router";
import request from "./axios";
export default {
  index() {
    return request.get(API.zhiye);
  },
  create(params) {
    return request.post(API.zhiye, params);
  },
  editshow(id) {
    return request.get(API.zhiyeId(id));
  },
  update(id, params) {
    return request.put(API.zhiyeId(id), params);
  },
  delete(id) {
    return request.delete(API.zhiyeId(id));
  }
};
