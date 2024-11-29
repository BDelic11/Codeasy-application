import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

type ErrorResponse = AxiosError & {
  response: {
    data: {
      error: string;
    };
  };
};

api.interceptors.response.use(
  (response) => response.data,
  (error: ErrorResponse) => {
    return Promise.reject(error.response.data.error);
  }
);
