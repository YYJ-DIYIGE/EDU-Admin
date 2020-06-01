import API from "./router";
import request from "./axios";
export default {
  create(params) {
    return request.post(API.Tasks, params);
  },
  update(id, params) {
    return request.put(API.TasksId(id), params);
  },
  delete(id) {
    return request.delete(API.TasksId(id));
  },
  editshow(id) {
    return request.get(API.TasksId(id));
  }
};
