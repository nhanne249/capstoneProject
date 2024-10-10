import { configureStore } from "@reduxjs/toolkit";
import signIn from "./slice/signIn";
import signUp from "./slice/signUp";
import admin from "./slice/admin";

const store = configureStore({
  reducer: {
    signIn: signIn.reducer,
    signUp: signUp.reducer,
    admin: admin.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;