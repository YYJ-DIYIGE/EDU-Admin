import API from "./router";
import request from "./axios";
export default {
  index(params) {
    return request.get(API.subject, params);
  },
  create(params) {
    return request.post(API.subject, params);
  },
  update(id, params) {
    return request.put(API.subjectId(id), params);
  },
  editshow(id) {
    return request.get(API.subjectId(id));
  },
  delete(id) {
    return request.delete(API.subjectId(id));
  }
};
