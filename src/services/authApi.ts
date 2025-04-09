import { TypeUser } from "../models/model";
import axiosClient from "./axiosClient";
// Định nghĩa kiểu cho thông tin đăng nhập
interface LoginCredentials {
  username: string;
  password: string;
}

// Định nghĩa kiểu cho thông tin người dùng trong reset password
interface ResetPasswordUserInfo {
  token: string;
  newPassword: string;
}
const authApi = {
  login(credentials: LoginCredentials) {
    const url = "/auth/login";
    return axiosClient.post(url, credentials);
  },

  register(userInfo: TypeUser) {
    const url = "/auth/register";
    return axiosClient.post(url, userInfo);
  },
  logout() {
    const url = "/auth/logout";
    return axiosClient.post(url);
  },
  forgotpassword(email: string) {
    const url = "/auth/forgotpassword";
    return axiosClient.post(url, email);
  },
  resetpassword(userInfo: ResetPasswordUserInfo) {
    const url = "/auth/resetpassword";
    return axiosClient.post(url, userInfo);
  },
};

export default authApi;
