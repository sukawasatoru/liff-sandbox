import axios, {AxiosRequestConfig} from "axios";

export const fetcher = (url: string, config?: AxiosRequestConfig) => axios.get(url, config).then(res => res.data);
