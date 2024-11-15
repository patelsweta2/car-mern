import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import apiMiddleware from "./middleware/apiMiddleware";
import toastMiddleware from "./middleware/toastMiddleware";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiMiddleware,
    toastMiddleware,
  ],
});

export default store;
