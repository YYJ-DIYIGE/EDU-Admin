import API from "./router";
import request from "./axios";
export default {
  index() {
    return request.get(API.course);
  },
  create(params) {
    return request.post(API.course, params);
  },
  editshow(id) {
    return request.get(API.courseId(id));
  },
  update(id, params) {
    return request.put(API.courseId(id), params);
  },
  delete(id) {
    return request.delete(API.courseId(id));
  }
};
