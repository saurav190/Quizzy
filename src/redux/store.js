import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";
import quizReducer from "./slices/quizSlice";

const reducer = {
  userSlice: userReducer,
  category: categoryReducer,
  quiz: quizReducer,
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
