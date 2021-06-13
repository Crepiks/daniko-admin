import request from "./request";

class PhotosRequests {
  static findAll() {
    return request.get("/photos").then((res) => res.data);
  }

  static uploadImage(imageFile) {
    return request({
      url: "/photos",
      method: "POST",
      data: imageFile,
    });
  }

  static deleteImage(imageId) {
    return request({
      url: `/photos/${imageId}`,
      method: "DELETE",
    });
  }
}

export default PhotosRequests;
