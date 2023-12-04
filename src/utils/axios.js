import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";
import { clearStore } from "../features/user/userSlice";

// we define a default url
const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});

// we define the authentication so we don't call it each time

customFetch.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage();
    if (user) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Unauthorized user");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
