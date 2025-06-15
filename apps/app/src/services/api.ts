import axios from "axios";

export const apiAxios = () => {
  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("token");
      if (token && config?.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};
