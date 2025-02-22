import { combineReducers } from "@reduxjs/toolkit";
import { tasksApi } from "./api/tasksApi";

const rootReducer = combineReducers({
  [tasksApi.reducerPath]: tasksApi.reducer,
});

export default rootReducer;
