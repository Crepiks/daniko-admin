import request from "./request";

class AdminsRequests {
  static findAll() {
    return request.get("/admins").then((res) => res.data);
  }

  static create(payload) {
    return request({
      url: "/admins",
      method: "POST",
      data: payload,
    }).then((res) => res.data);
  }

  static findOne(adminId) {
    return request.get(`/admins/${adminId}`).then((res) => res.data);
  }

  static update(adminId, payload) {
    return request({
      url: `/admins/${adminId}`,
      method: "PATCH",
      data: payload,
    }).then((res) => res.data);
  }

  static delete(adminId) {
    return request.delete(`/admins/${adminId}`).then((res) => res.data);
  }
}

export default AdminsRequests;
