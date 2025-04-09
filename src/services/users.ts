import axiosClient from "./axiosClient";

const usersApi = {
  getAll(params?: unknown) {
    const url = "/users";
    return axiosClient.get(url, { params });
  },

  remove(id: string) {
    const url = `/users/${id}`;
    return axiosClient.delete(url);
  },
};
export default usersApi;
