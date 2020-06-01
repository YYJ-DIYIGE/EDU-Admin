import API from "./router";
import request from "./axios";
export default {
  index() {
    return request.get(API.material);
  },
  create(params) {
    return request.post(API.material, params);
  },
  editshow(id) {
    return request.get(API.materialId(id));
  },
  update(id, params) {
    return request.put(API.materialId(id), params);
  },
  delete(id) {
    return request.delete(API.materialId(id));
  }
};
