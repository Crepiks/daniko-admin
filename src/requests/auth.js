import request from "./request";

class AuthRequests {
  static login(payload) {
    return request({
      url: "/admins/login",
      method: "POST",
      data: payload,
    });
  }
}

export default AuthRequests;
