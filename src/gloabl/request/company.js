import API from "./router";
import request from "./axios";
export default {
  index() {
    return request.get(API.company);
  },
  create(params) {
    return request.post(API.company, params);
  },
  editshow(id) {
    return request.get(API.companyId(id));
  },
  update(id, params) {
    return request.put(API.companyId(id), params);
  },
  delete(id) {
    return request.delete(API.companyId(id));
  }
};
