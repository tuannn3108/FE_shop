import type { TypeProduct } from "@/models/model";
import sanphamApi from "@/services/productApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type TypeInitProps = {
  loading: boolean;
  error: boolean;
  product: TypeProduct[];
};

export const getAllproducts = createAsyncThunk(
  "product/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await sanphamApi.getAll({page: 1, limit: 10000});
      if (response && response.data) {
        return response.data.data.data;
      } else {
        return rejectWithValue("No data found");
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Unknown error occurred");
      }
    }
  }
);

const initialState: TypeInitProps = {
  error: false,
  loading: false,
  product: [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllproducts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.error = false;
      })
      .addCase(getAllproducts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

// export const { setToast, clearToast } = productSlice.actions;
export default productSlice.reducer;
