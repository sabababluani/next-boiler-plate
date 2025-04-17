import axios from 'axios';
import * as dotenv from 'dotenv';
import { cookies } from 'next/headers';

dotenv.config();

const BaseApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}`,
});

BaseApi.interceptors.request.use(
  async (config) => {
    try {
      const cookiesData = await cookies();
      const accessToken = cookiesData.get('accessToken')?.value;
      const refreshToken = cookiesData.get('refreshToken')?.value;

      const cookieHeader = `accessToken=${accessToken}; refreshToken=${refreshToken}`;

      config.headers.Cookie = cookieHeader;
      config.headers['Content-Type'] = 'application/json';

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default BaseApi;
