import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import projectReducer from "./Slices/projectSlice";
import chatReducer from "./Slices/chatSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    chat: chatReducer,
  },
});

export default store;
