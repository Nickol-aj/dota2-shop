import { useDispatch } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

import filter from "./filter/slice";

import cart from "./cart/slice";

import product from "./product/slice";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    product,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
