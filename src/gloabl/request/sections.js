import API from "./router";
import request from "./axios";
export default {
  create(params) {
    return request.post(API.sections, params);
  },
  update(id, params) {
    return request.put(API.sectionsId(id), params);
  },
  delete(id) {
    return request.delete(API.sectionsId(id));
  },
  editshow(id) {
    return request.get(API.sectionsId(id));
  }
};
