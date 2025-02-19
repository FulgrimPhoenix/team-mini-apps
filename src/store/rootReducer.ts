import { combineReducers } from "@reduxjs/toolkit";
import { tasksApi } from "./tasksApi";

const rootReducer = combineReducers({
  [tasksApi.reducerPath]: tasksApi.reducer,
});

export default rootReducer;
