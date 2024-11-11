import axios, { AxiosResponse } from "axios";

import { LoginRequest, SignupFormnType, UserResponse } from "../types";

import api, { BACKEND_API_URL } from "../config/api";

export const AuthApi = {
  login(user: LoginRequest) {
    return api
      .post("/login", user)
      .then(({ data }: AxiosResponse<{ access_token: string }>) => data);
  },
  forgotPassword(email: string) {
    return api.post(`/user/forgot`, { email });
  },
  resetPassword(data: { password: string; repeatPassword: string }) {
    return api.post("/user/recover", data);
  },
  getUser(url: string) {
    return api.get(url).then(({ data }: AxiosResponse<UserResponse>) => data);
  },
  createUser(signupData: SignupFormnType) {
    return axios.post(`${BACKEND_API_URL}/users`, signupData);
  },
  changePassword(
    data: { password: string; repeatPassword: string },
    url: string,
  ) {
    return api.post(url, data).then(({ data }: AxiosResponse<string>) => data);
  },
};
