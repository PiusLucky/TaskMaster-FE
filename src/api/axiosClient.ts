import axios, { AxiosError, AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { storageKeys } from "./storageKeys";

class ApiClient {
  private baseUrl: string;
  private axiosClient: AxiosInstance;

  constructor() {
    const baseUrl = process.env.NEXT_PUBLIC_API!;
    const axiosClient = axios.create({
      baseURL: baseUrl,
    });

    axiosClient.interceptors.request.use(
      function(req: any) {
        const token = Cookies.get(storageKeys.token);

        if (token) {
          req.headers.authorization = `Bearer ${token}`;
        }
        return req;
      },
      function(err) {
        return Promise.reject(err);
      }
    );

    this.axiosClient = axiosClient;
    this.baseUrl = baseUrl;
  }

  async get<T>(resource: string, endpoint: string, setError: any): Promise<T> {
    try {
      const response = await this.axiosClient.get(
        `${this.baseUrl}${resource}${endpoint}`
      );
      return response.data;
    } catch (error) {
      throw this.handleAxiosError(error as AxiosError, setError);
    }
  }

  async put(
    resource: string,
    endpoint: string,
    data: any,
    setError: any,
    setSuccess: any = null
  ) {
    try {
      const response = await this.axiosClient.put(
        `${this.baseUrl}${resource}${endpoint}`,
        data
      );

      if (setSuccess) {
        this.handleAxiosSuccess(response.data, setSuccess);
      }

      return response.data;
    } catch (error) {
      throw this.handleAxiosError(error as AxiosError, setError);
    }
  }

  async post(
    resource: string,
    endpoint: string,
    data: any,
    setError: any,
    setSuccess: any = null
  ) {
    try {
      const response = await this.axiosClient.post(
        `${this.baseUrl}${resource}${endpoint}`,
        data
      );

      if (setSuccess) {
        this.handleAxiosSuccess(response.data, setSuccess);
      }

      return response.data;
    } catch (error) {
      throw this.handleAxiosError(error as AxiosError, setError);
    }
  }

  async delete(
    resource: string,
    endpoint: string,
    setError: any,
    setSuccess: any
  ) {
    try {
      const response = await this.axiosClient.delete(
        `${this.baseUrl}${resource}${endpoint}`
      );

      if (setSuccess) {
        this.handleAxiosSuccess(response.data, setSuccess);
      }

      return response.data;
    } catch (error) {
      throw this.handleAxiosError(error as AxiosError, setError);
    }
  }

  private handleAxiosError(error: AxiosError, setError: any) {
    const noTokenDetected =
      error.response?.data?.msg === "Missing Authorization Header";
    const errorMessage =
      error.response?.data?.meta?.message || "Missing Authorization Header";
    const statusCode = error.response?.data?.meta?.statusCode;

    setError(() => ({
      statusCode: statusCode ? statusCode : 500,
      errorMessage: errorMessage ? errorMessage : "Internal Server error",
      errorOpenState: true,
    }));

    setTimeout(() => {
      if (noTokenDetected) {
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      }
    }, 500);
  }

  private handleAxiosSuccess(data: any, setSuccess: any) {
    const successMessage = data?.meta?.message;

    setSuccess(() => ({
      successMessage: successMessage
        ? successMessage
        : "Action completed successfully",
      successOpenState: true,
    }));
  }
}

export default ApiClient;
