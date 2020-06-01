import API from "./router";
import request from "./axios";
export default {
  index(params) {
    return request.get(API.chapters, params);
  },
  create(params) {
    return request.post(API.chapters, params);
  },
  sort(params) {
    return request.put(API.chaptersSort, params);
  },
  update(id, params) {
    return request.put(API.chaptersId(id), params);
  },
  delete(id) {
    return request.delete(API.chaptersId(id));
  }
};
