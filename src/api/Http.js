import axios from "axios";

export const baseURL = "https://reqres.in/api/";

export default axios.create({
  baseURL
});
