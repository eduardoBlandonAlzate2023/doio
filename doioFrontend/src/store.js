import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import testData from "../../doioScrappers/testData.json"

const initialState = {
  products: [],
  featuredProducts: [],
  categories: [],
  items: 12,
  pageNumber: 1,
  searchItem: "",
  previousPage: false,
  nextPage: false,
  isSidebarOpen: false,
};

export const fetchProducts = createAsyncThunk(
  "state/fetchProducts",
  async ({ items, pageNumber, searchItem }) => {
    // const response = await axios.get(`${import.meta.env.VITE_API}/products`, {
    //   params: {
    //     items,
    //     pageNumber,
    //     searchItem,
    //   },
    // });
    // return response.data;
    return {
      data: testData.products,
      previousPage: true,
      nextPage: true,
    } 
  }
);

export const fetchCategories = createAsyncThunk(
  "state/fetchCategories",
  async () => {
    // const response = await axios.get(`${import.meta.env.VITE_API}/categories`);
    return testData.categories
    // return response.data;
  }
);

const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSearchItem: (state, action) => {
      state.searchItem = action.payload;
      state.pageNumber = 1;
    },
    setPreviousPage: (state, action) => {
      state.previousPage = action.payload;
    },
    setNextPage: (state, action) => {
      state.nextPage = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.products = [];
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.previousPage = action.payload.previousPage;
        state.nextPage = action.payload.nextPage; 
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.products = [];
      })
      .addCase(fetchCategories.pending, (state) => {
        state.categories = [];
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categories = [];
      });
  },
});

export const {
  setItems,
  setPageNumber,
  setSearchItem,
  setPreviousPage,
  setNextPage,
  toggleSidebar,
} = slice.actions;

export default slice.reducer;
