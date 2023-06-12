

import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "http://localhost:8080";
const login_path = "/api/auth/login";
const product_list = "/prod/client/filter/";

axios.interceptors.request.use((req) => {
  const jwt = Cookies.get("jwt");
  const newUrl = baseUrl + req.url;

  const Authorization = (req.url === login_path || req.url.startsWith("/prod/client/")) ? undefined : `Bearer ${jwt}`;


  return {
    ...req,
    url: newUrl,
    headers: {
      ...req.headers,
      Authorization,
      "ngrok-skip-browser-warning": "1",
    },
  };
});

axios.interceptors.request.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axios;
