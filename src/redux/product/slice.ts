import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Product, ProductSliceState, Status } from "./types";

import { fetchProduct } from "./asyncActions";

const initialState: ProductSliceState = {
  data: {
    items: [],
    pagination: {
      count: 1,
    },
  },
  status: Status.LOADING,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setItems(
      state,
      action: PayloadAction<{ items: Product[]; pagination: { count: number } }>
    ) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.data.items = [];
      state.status = Status.LOADING;
    });

    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
    });
    ``;

    builder.addCase(fetchProduct.rejected, (state) => {
      state.data.items = [];
      state.status = Status.ERROR;
    });
  },
});

export const { setItems } = productSlice.actions;

export default productSlice.reducer;
