import request from "./request";

class ContactsRequests {
  static findAll() {
    return request.get("/contacts").then((res) => res.data);
  }

  static update(payload) {
    return request({
      url: "/contacts",
      method: "PATCH",
      data: payload,
    }).then((res) => res.data);
  }
}

export default ContactsRequests;
