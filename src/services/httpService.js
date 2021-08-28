import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(
  (response) => {
    console.log(response.config.method," ",response.config.url," status:", response.status);
    return response;
  },
  (error) => {
    toast.error(error.response.data.error);
    console.log("Error from remote service: ", error.message,error.response.data);
  }
);

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
