import Http from "../Http";

const resource = "users";

export default {
  get(page) {
    return Http.get(`${resource}?page=${page}&per_page=6`);
  },
  create(data) {
    return Http.post(`${resource}`, {
      data
      // data: {
      //   id: 354,
      //   email: "ssss.weaver@reqres.in",
      //   first_name: "ss",
      //   last_name: "ss",
      //   avatar:
      //     "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
      // }
    });
  },
  update(id, data) {
    return Http.patch(`${resource}/${id}`, {
      data
      // data: {
      //   email: "ssss.weaver@reqres.in",
      //   first_name: "ss",
      //   last_name: "ss",
      //   avatar:
      //     "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
      // }
    });
  },
  delete(id) {
    return Http.patch(`${resource}/${id}`);
  }
};
