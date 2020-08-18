const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

const run = require("./src/controllers/globalFunction")
// const rootIndex = require("./src/routes/index");
const routerUsers = require("./src/routes/users");
const routerProduct = require("./src/routes/products");
const routerIn = require("./src/routes/product-in");
const routerOut = require("./src/routes/product-out");

run.reportMonth()
run.checkStock()
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
app.use("/api/v1/user", routerUsers);
app.use("/api/v1/product", routerProduct);
app.use("/api/v1/In", routerIn);
app.use("/api/v1/Out", routerOut);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
