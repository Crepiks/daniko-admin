import request from "./request";

class WorkersRequests {
  static findAll() {
    return request.get("/workers").then((res) => res.data);
  }

  static create(payload) {
    return request({
      url: "/workers",
      method: "POST",
      data: payload,
    }).then((res) => res.data);
  }

  static findOne(workerId) {
    return request.get(`/workers/${workerId}`).then((res) => res.data);
  }

  static update(workerId, payload) {
    return request({
      url: `/workers/${workerId}`,
      method: "PATCH",
      data: payload,
    }).then((res) => res.data);
  }

  static delete(workerId) {
    return request.delete(`/workers/${workerId}`).then((res) => res.data);
  }
}

export default WorkersRequests;
