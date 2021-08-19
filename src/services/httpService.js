import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(
  (response) => {
    console.log("RESPONSE status", response.status);
    toast.success("Success");
    return response;
  },
  (error) => {
    toast.error("Error calling remote service...");
    console.log("RESPONSE interceptor called!", error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
