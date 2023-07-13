import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { Product, SearchProductParams } from "./types";

import { PRODUCTS_URL } from "../../server/serverLink";

export const fetchProduct = createAsyncThunk<
  { items: Product[]; pagination: { count: number } },
  SearchProductParams
>("product/fetchProductStatus", async (params) => {
  const { order, sortBy, category, search, currentPage } = params;
  const { data } = await axios.get(
    `${PRODUCTS_URL}?page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}${search}`
  );
  window.scrollTo(0, 0);
  return data;
});
