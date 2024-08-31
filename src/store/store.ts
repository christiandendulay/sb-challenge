import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./recipeSlice";

export const store = configureStore({
  reducer: {
    recipeSlice: recipeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
