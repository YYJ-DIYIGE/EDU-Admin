import API from "./router";
import request from "./axios";
export default {
  index(params) {
    return request.get(API.stories, params);
  },
  create(params) {
    return request.post(API.stories, params);
  },
  sort(params) {
    return request.put(API.storiesSort, params);
  },
  update(id, params) {
    return request.put(API.storiesId(id), params);
  },
  delete(id) {
    return request.delete(API.storiesId(id));
  }
};
