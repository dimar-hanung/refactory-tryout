const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

// const rootIndex = require("./src/routes/index");
const routerUsers = require("./src/routes/users");
const routerProduct = require("./src/routes/products");
const routerIn = require("./src/routes/product-in");
const routerOut = require("./src/routes/product-out");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.use("/", rootIndex);
app.use("/user", routerUsers);
app.use("/product", routerProduct);
app.use("/In", routerIn);
app.use("/Out", routerOut);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
