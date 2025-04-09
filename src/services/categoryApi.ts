import axiosClient from "./axiosClient";

const categoryApi = {
  getAll(params: unknown) {
    const url = "/category";
    return axiosClient.get(url, { params: params });
  },

  getById(id: string | number) {
    const url = `/category/${id}`;
    return axiosClient.get(url);
  },

  create(data: { name: string }) {
    const url = "/category/add";
    return axiosClient.post(url, data);
  },

  update(id: string | number, data: { name: string; description: string }) {
    const url = `/category/${id}`;
    return axiosClient.put(url, data);
  },

  delete(id: string | number) {
    const url = `/category/${id}`;
    return axiosClient.delete(url);
  },
};
export default categoryApi;
