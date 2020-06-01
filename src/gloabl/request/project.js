import API from "./router";
import request from "./axios";
export default {
  index() {
    return request.get(API.project);
  },
  create(params) {
    return request.post(API.project, params);
  },
  editshow(id) {
    return request.get(API.projectId(id));
  },
  update(id, params) {
    return request.put(API.projectId(id), params);
  },
  delete(id) {
    return request.delete(API.projectId(id));
  }
};
