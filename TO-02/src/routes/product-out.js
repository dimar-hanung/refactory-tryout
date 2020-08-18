const express = require("express");
const router = express.Router();

const ProductsController = require("../controllers/ProductOutController");

router
.get("/",ProductsController.getProducts)
.post("/",ProductsController.saveProduct)
// .post("/image",ProductsController.uploadImage)

router.route("/:id")
.get(ProductsController.getProductById)
.put(ProductsController.updateProduct)
.delete(ProductsController.deleteProduct)

module.exports = router;