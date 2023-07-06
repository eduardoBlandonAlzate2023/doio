const express = require("express");
const router = express.Router();
const {
  getProducts,
  getFeaturedProducts,
  getCategories,
  postClickInfo,
} = require("./controllers");

router.get("/products", getProducts);

router.get("/featuredProducts", getFeaturedProducts);

router.get("/categories", getCategories);

router.post("/clickInfo", postClickInfo);

module.exports = router;
