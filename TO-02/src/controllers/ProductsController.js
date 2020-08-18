const { products, product, comment } = require("../db/models");
const run = require("./globalFunction");
const response = {
  status: true,
  message: "",
  data: [],
};

class ProductController {
  static async getProducts(req, res) {
    const {
      query: { limit, page },
    } = req;
    //   console.log(limit,page)

    const data = await products.findAll();
    response.data = data;
    response.message = "Succes get product data";

    res.json(response);
  }
  static async getProductById(req, res) {
    console.log("Berhasil Mendapatkan data");
    console.log(req.params);
    const data = await products
      .findByPk(req.params.id)
      .catch((err) => res.json(err));
    response.data = data;
    response.message = "Succes get product data";
    res.json(response);
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;
    const data = await products
      .destroy({
        where: { id: id },
      })
      .catch((err) => res.json(err));

    response.data = data;
    response.message = `${data ? "Success delete" : "Failed empty"} data`;
    response.status = "Success";

    res.json(response);
  }
  static async saveProduct(req, res) {
    const {
      body: { data },
    } = req;
    console.log(data);
    try {
      const save = await products.create(data);
      response.message = "sukses simpan data";
      response.data = save;
      res.status(201).json(response);
    } catch (error) {
      response.status = false;
      response.message = error.message;
      res.status(400).json(response);
    }
  }

  static async updateProduct(req, res) {
    const {
      name,stock,price,userId
    } = req.body.data;
    const {id} = req.params
    const data = await products
      .update(
        {name,stock,price,userId},
        {
          where: {
            id: id,
          },
        }
      )
      .catch((err) => res.json(err));
    response.data = data[0];
    response.message = `${data[0] ? "Success update" : "Failed id not found"} data`;
    response.status = "Success";
    res.json(response)
  }
}

module.exports = ProductController;
