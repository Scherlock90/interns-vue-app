import Http from "../Http";

const resource = "users";

export default {
  get(page) {
    return Http.get(`${resource}?page=${page}&per_page=6`);
  },
  create(data) {
    return Http.post(`${resource}`, { data });
  },
  update(id, data) {
    return Http.patch(`${resource}/${id}`, data);
  },
  delete(id) {
    return Http.delete(`${resource}/${id}`);
  },
};
