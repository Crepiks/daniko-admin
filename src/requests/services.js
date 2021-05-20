import request from "./request";

class ServicesRequests {
  static findAll() {
    return request.get("/services").then((res) => res.data);
  }

  static create(payload) {
    return request({
      url: "/services",
      method: "POST",
      data: payload,
    }).then((res) => res.data);
  }

  static findOne(serviceId) {
    return request.get(`/services/${serviceId}`).then((res) => res.data);
  }

  static update(serviceId, payload) {
    return request({
      url: `/services/${serviceId}`,
      method: "PATCH",
      data: payload,
    }).then((res) => res.data);
  }

  static delete(serviceId) {
    return request.delete(`/services/${serviceId}`).then((res) => res.data);
  }
}

export default ServicesRequests;
