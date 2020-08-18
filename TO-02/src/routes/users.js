const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/UsersController");

router
.get("/",UsersController.getUser)
.post("/",UsersController.saveUser)
// .post("/image",UsersController.uploadImage)

router.route("/:id")
.get(UsersController.getUserById)
.put(UsersController.updateUser)
.delete(UsersController.deleteUser)

module.exports = router;