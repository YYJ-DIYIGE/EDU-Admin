import API from "./router";
import request from "./axios";
export default {
  create(params) {
    return request.post(API.advertiseMaterial, params);
  },
  sort(params) {
    return request.post(API.advertiseMaterialSort, params);
  },
  update(id, params) {
    return request.put(API.advertiseMaterialID(id), params);
  },
  delete(id) {
    return request.delete(API.advertiseMaterialID(id));
  }
};
