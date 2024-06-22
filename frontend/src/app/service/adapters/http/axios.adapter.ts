import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from './http.adapter';

interface Options {
  baseUrl: string;
  timeout: number
}

export class AxiosAdapter implements HttpAdapter{
  private axiosInstance: AxiosInstance;

  constructor(options: Options) {
    this.axiosInstance = axios.create({
        baseURL: options.baseUrl,
        timeout: options.timeout
    })
}
  async get<T>(url: string): Promise<T> {
    try {
        const {data} = await this.axiosInstance.get(url)
        return data;
    } catch (error) {
      throw new Error(`Error fetching get: ${url}, ${error}`);
    }
  }
  async post<T>(url: string, json: any, contentType: string): Promise<T> {
    try {
      const {data} = await this.axiosInstance.post(url, json, {
        headers: {
          'Content-Type': contentType // Header para la petición POST
        }
      });
      return data;
    } catch (error) {
      throw new Error(`Error fetching post: ${url}, ${error}`);
    }
  }
  async put<T>(url: string, json: any, contentType: string): Promise<T> {
    try {
      const {data} = await this.axiosInstance.put(url, json, {
        headers: {
          'Content-Type': contentType // Header para la petición POST
        }
      });
      return data;
    } catch (error) {
      throw new Error(`Error fetching put: ${url}, ${error}`);
    }
  }

}
