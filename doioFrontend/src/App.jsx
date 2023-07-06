import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts } from "./store";
import AppHeader from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";
import Grid from "@mui/material/Grid";
import Pagination from "./components/Pagination";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.state.products);
  const items = useSelector((state) => state.state.items);
  const pageNumber = useSelector((state) => state.state.pageNumber);
  const searchItem = useSelector((state) => state.state.searchItem);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    dispatch(fetchProducts({ items, pageNumber, searchItem }));
  }, [items, pageNumber, searchItem]);

  return (
    <Box sx={{backgroundColor: theme.palette.primary.white}}>
      <AppHeader />
      <Sidebar />
      <Grid container spacing={3} sx={{ padding: "3vh 1vw" }}>
        {products.map((product, k) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard
              key={k}
              image={product.imageLink}
              title={product.title}
              link={product.link}
              discount={product.discount}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination />
    </Box>
  );
}

export default App;
