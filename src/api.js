import axios from "axios";
import history from "./history";
import {AppRoute} from "./utils/constants";

const TIMEOUT = 5000;
const LOGIN_URL = `https://htmlacademy-react-3.appspot.com/wtw/login`;
const Error = {
  UNAUTHORIZED: 401
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/wtw`,
    timeout: TIMEOUT,
    withCredentials: true
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response, request} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();

      if (request.responseURL !== LOGIN_URL) {
        history.push(AppRoute.LOGIN);
      }

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
