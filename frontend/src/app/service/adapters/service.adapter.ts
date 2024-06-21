import { AxiosAdapter } from "./http/axios.adapter";

export const serviceFetcher = new AxiosAdapter({
    baseUrl: 'http://127.0.0.1:5000',
    timeout: 10000
})