import Http from "../Http";

const base = "https://api.imgbb.com/1/upload";

export default {
  create(image) {
    return Http.post(base, {
      key: "0088f3403597ec5ee6c64a144b7c3107",
      image
    });
  }
};
