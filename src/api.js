import axios from "axios";

const TIMEOUT = 5000;

export const createAPI = () => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/wtw`,
    timeout: TIMEOUT,
    withCredentials: true
  });

  return api;
};
