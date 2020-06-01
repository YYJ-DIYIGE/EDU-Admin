import API from "./router";
import request from "./axios";
export default {
  index(id) {
    return request.get(API.versionsId(id));
  },
  create(params) {
    return request.post(API.versions, params);
  },
  sort(params) {
    return request.put(API.versionsSort, params);
  },
  update(id, params) {
    return request.put(API.versionsId(id), params);
  },
  delete(id) {
    return request.delete(API.versionsId(id));
  }
};
