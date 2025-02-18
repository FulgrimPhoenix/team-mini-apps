import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { tasksApi } from "./tasksApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
});
