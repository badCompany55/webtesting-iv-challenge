const db = require("../knexConfig.js");

module.exports = {
  getAllUsers,
  addNewUser,
  deleteUser,
  getSingleUser
};

function getAllUsers() {
  return db("users");
}

function addNewUser(user) {
  return db("users").insert(user);
}

function deleteUser(id) {
  return db("users")
    .where("id", id)
    .del();
}

function getSingleUser(name) {
  return db("users")
    .where("full_name", name)
    .first();
}
