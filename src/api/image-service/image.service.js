import { ajax } from "rxjs/ajax";

export default {
  create(image) {
    return ajax({
      url: `https://api.imgbb.com/1/upload`,
      method: "POST",
      body: {
        key: "0088f3403597ec5ee6c64a144b7c3107",
        image,
      },
    });
  },
};
