import API from "./router";
import request from "./axios";
export default {
  index() {
    return request.get(API.advertise);
  },
  create(params) {
    return request.post(API.advertise, params);
  },
  editshow(id) {
    return request.get(API.advertiseId(id));
  },
  update(id, params) {
    return request.put(API.advertiseId(id), params);
  },
  delete(id) {
    return request.delete(API.advertiseId(id));
  }
};
