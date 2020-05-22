import InternsService from "./interns-service/interns.service";

const services = {
  users: InternsService
};

export const ServiceFactory = {
  get: name => services[name]
};
