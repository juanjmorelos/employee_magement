import { AxiosAdapter } from "./http/axios.adapter";

export const baseUrl = 'http://127.0.0.1:5000'
export const serviceFetcher = new AxiosAdapter({
    baseUrl: baseUrl,
    timeout: 10000
})