import requests from "./requests";
import serverInstance from "./axiosInstance";

class apiCaller {
  static async getUserDetails(email, name) {
    const data = await serverInstance.get(
      requests.getUserDetails + email + "/" + name
    );
    return data.data;
  }
  static async searchByCatagory(cat) {
    const data = await serverInstance.get(requests.searchByCatagory + cat);
    return data.data;
  }
  static async search(limit) {
    const data = await serverInstance.get(requests.search + limit);
    return data.data;
  }
  static async searchByID(id) {
    const data = await serverInstance.get(requests.searchByID + id);
    return data.data;
  }
  static async addToCart(email, id) {
    const data = await serverInstance.get(
      requests.addToCart + email + "/" + id
    );
    return data.data;
  }
  static async addToMyBooks(email, id) {
    let currentTime = new Date().toString();
    //console.log(requests.addToMyBooks + email+"/"+id + "/" + currentTime)
    const data = await serverInstance.get(
      requests.addToMyBooks + email + "/" + id + "/" + currentTime
    );
    return data.data;
  }
}

export default apiCaller;
