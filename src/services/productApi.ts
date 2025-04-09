import axiosClient from "./axiosClient";

const sanphamApi = {
  getAll(params?: unknown) {
    const url = "/sanpham";
    return axiosClient.get(url, { params });
  },

  getById(id: string) {
    const url = `/sanpham/${id}`;
    return axiosClient.get(url);
  },

  checkout(data: unknown) {
    const url = `/sanpham/checkout`;
    return axiosClient.post(url, data);
  },

  add(data: any) {
    const url = `/sanpham/add`;
    return axiosClient.post(url, data);
  },

  update(id: string, data: any) {
    const url = `/sanpham/${id}`;
    return axiosClient.put(url, data);
  },

  remove(id: string) {
    const url = `/sanpham`;
    return axiosClient.delete(url, { data: { id } });
  },
};
export default sanphamApi;
