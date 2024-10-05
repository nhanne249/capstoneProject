import { configureStore } from "@reduxjs/toolkit";
import signIn from "./slice/signIn";
import signUp from "./slice/signUp";

const store = configureStore({
  reducer: {
    signIn: signIn.reducer,
    signUp: signUp.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;