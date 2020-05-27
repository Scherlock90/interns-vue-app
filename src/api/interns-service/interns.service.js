import Http from "../Http";

const base = "https://reqres.in/api/users";

export default {
  get(page) {
    return Http.get(`${base}?page=${page}&per_page=6`);
  },
  create(data) {
    return Http.post(`${base}`, data);
  },
  update(id, data) {
    return Http.patch(`${base}/${id}`, data);
  },
  delete(id) {
    return Http.delete(`${base}/${id}`);
  },
};
