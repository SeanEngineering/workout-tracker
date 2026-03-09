/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "../lib/supabase/client";
import axios from "axios";

export const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
export const messageBaseUrl = import.meta.env.VITE_MESSAGING_BASE_URL;

const attachAuthInterceptor = (instance: ReturnType<typeof axios.create>) => {
  instance.interceptors.request.use(async (config: any) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  });
  return instance;
};

export const api = attachAuthInterceptor(axios.create({ baseURL: baseUrl }));
export const messageApi = attachAuthInterceptor(axios.create({ baseURL: messageBaseUrl }));