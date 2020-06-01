import API from "./router";
import request from "./axios";
export default {
  index(params) {
    return request.get(API.zhiyePath, params);
  },
  create(params) {
    return request.post(API.zhiyePath, params);
  },
  sort(params) {
    return request.put(API.zhiyePathSort, params);
  },
  update(id, params) {
    return request.put(API.zhiyePathId(id), params);
  },
  delete(id) {
    return request.delete(API.zhiyePathId(id));
  },
  editShow(id) {
    return request.get(API.zhiyePathId(id));
  }
};
