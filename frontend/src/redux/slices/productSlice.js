import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action or Middleware
export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async ({ page, limit,token }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/product/`,
        { headers: { Authorization: "Bearer "+token } }

        // `/api/v1/products/all-products?page=${page}&limit=${limit}`
      );
      if (data?.success) {
        return data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: { 
    data: [],
    
    isError: false,
  },
  reducers: {
    updateProducts: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isError = false;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isError = false;
      state.data = action.payload;  
    });

    builder.addCase(fetchProducts.rejected, (state) => {
      state.isError = true;
    });
  },
});

export default productSlice.reducer;
export const { updateProducts } = productSlice.actions;
