import InternsService from "./interns-service/interns.service";
import ImageService from "./image-service/image.service";

const services = {
  users: InternsService,
  image: ImageService
};

export const ServiceFactory = {
  get: name => services[name]
};
