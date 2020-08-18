const { users, post, comment } = require("../db/models");
const run = require("./globalFunction");
const response = {
  status: true,
  message: "",
  data: [],
};

class UserController {
  static async getUser(req, res) {
    const {
      query: { limit, page },
    } = req;
    //   console.log(limit,page)

    const data = await users.findAll();
    response.data = data;
    response.message = "Succes get user data";

    res.json(response);
  }
  static async getUserById(req, res) {
    console.log("Berhasil Mendapatkan data");
    console.log(req.params);
    const data = await users
      .findByPk(req.params.id)
      .catch((err) => res.json(err));
    response.data = data;
    response.message = "Succes get user data";
    res.json(response);
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    const data = await users
      .destroy({
        where: { id: id },
      })
      .catch((err) => res.json(err));

    response.data = data;
    response.message = `${data ? "Success delete" : "Failed empty"} data`;
    response.status = "Success";

    res.json(response);
  }
  static async saveUser(req, res) {
    const {
      body: { data },
    } = req;
    console.log(data);
    try {
      const save = await users.create(data);
      response.message = "sukses simpan data";
      response.data = save;
      res.status(201).json(response);
    } catch (error) {
      response.status = false;
      response.message = error.message;
      res.status(400).json(response);
    }
  }

  static async updateUser(req, res) {
    const {
      full_name, username, email, password,role,
    } = req.body.data;
    const {id} = req.params
    const data = await users
      .update(
        {
          full_name,
          username,
          email,
          password,
          role,
        },
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

module.exports = UserController;
