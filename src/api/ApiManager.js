import axios from "axios";

const ApiManager = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  withCredentials: true,
});

export default ApiManager;
