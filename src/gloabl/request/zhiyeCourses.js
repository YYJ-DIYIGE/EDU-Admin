import API from "./router";
import request from "./axios";
export default {
  create(params) {
    return request.post(API.zhiyeCourses, params);
  },
  update(id, params) {
    return request.put(API.zhiyeCoursesId(id), params);
  },
  delete(id) {
    return request.delete(API.zhiyeCoursesId(id));
  }
};
