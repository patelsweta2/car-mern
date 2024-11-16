import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import apiMiddleware from "./middleware/apiMiddleware";
import toastMiddleware from "./middleware/toastMiddleware";
import carReducer from "./slices/carSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    car: carReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiMiddleware,
    toastMiddleware,
  ],
});

export default store;
