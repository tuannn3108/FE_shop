import { TypeOrder } from "../models/model";
import axiosClient from "./axiosClient";

const orderApi = {
  getAll(params: unknown) {
    const url = "/order";
    return axiosClient.get(url, { params: params });
  },

  getOrderById(id: string | number) {
    const url = `/order/byUserId/${id}`;
    return axiosClient.get(url);
  },

  getById(id: string | number) {
    const url = `/order/${id}`;
    return axiosClient.get(url);
  },

  checkout(data: TypeOrder) {
    const url = `/order/checkout`;
    return axiosClient.post(url, data);
  },
};
export default orderApi;
