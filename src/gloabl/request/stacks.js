import API from "./router";
import request from "./axios";
export default {
  index(params) {
    return request.get(API.stacks, params);
  },
  create(params) {
    return request.post(API.stacks, params);
  },
  editshow(id) {
    return request.get(API.stacksId(id));
  },
  update(id, params) {
    return request.put(API.stacksId(id), params);
  },
  delete(id) {
    return request.delete(API.stacksId(id));
  }
};
