import { configureStore } from "@reduxjs/toolkit";
import signIn from "./slice/signIn";
import signUp from "./slice/signUp";
import admin from "./slice/admin";
import book from "./slice/book";
import user from "./slice/user";

const store = configureStore({
  reducer: {
    signIn: signIn.reducer,
    signUp: signUp.reducer,
    admin: admin.reducer,
    book: book.reducer,
    user: user.reducer, 
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;