const db = require("./knexConfig.js");

module.exports = {
  addUser,
  deleteUser
};

function addUser(user) {
  db("users").insert(user);
}

function deleteUser(id) {
  db("users")
    .where("id", id)
    .del();
}
