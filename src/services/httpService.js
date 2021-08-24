import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(
  (response) => {
    console.log("RESPONSE status", response.status);
    return response;
  },
  (error) => {
    toast.error("Error calling remote service...");
    console.log("RESPONSE interceptor called!", error);
  }
);

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
