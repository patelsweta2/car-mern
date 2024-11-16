import axios from "axios";
import Cookies from "js-cookie";

const request = async (httpConfig) => {
  httpConfig.headers = { "Content-Type": "application/json" };
  if (Cookies.get("token")) {
    const token = Cookies.get("token");
    if (token) {
      httpConfig.headers.Authorization = `Bearer ${token}`;
    }
  }
  try {
    const { data } = await axios.request(httpConfig);
    return { success: true, data };
  } catch (error) {
    if (error?.response) {
      return { success: false, data: error?.response?.data || error.response };
    }
    return { success: false, data: error?.response?.data };
  }
};

export default request;
