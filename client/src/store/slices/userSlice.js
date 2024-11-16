import { createSlice } from "@reduxjs/toolkit";
import actionFactory from "@/utils/actionFactory";
import ENDPOINTS from "@/network/endPoints";
import Cookies from "js-cookie";

const initialState = {
  value: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload.user;
      Cookies.set("user", JSON.stringify(action.payload.user));
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

//create action
export const SignUpAction = (data) => {
  const action = actionFactory();
  action.payload = {
    method: "POST",
    url: ENDPOINTS.SIGNUP,
    data,
  };
  return action;
};

export const SignInAction = (data) => {
  const action = actionFactory();
  action.payload = {
    method: "POST",
    url: ENDPOINTS.SIGNIN,
    data,
    onSuccess: setUser.type,
  };
  return action;
};
