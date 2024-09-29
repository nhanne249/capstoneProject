import { configureStore } from "@reduxjs/toolkit";
import signin from "./slice/signin";

const store = configureStore({
  reducer: {
    signin: signin.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;