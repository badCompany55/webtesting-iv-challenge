const express = require("express");
const users = require("../data/models/usersModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const theUsers = await users.getAllUsers();
    res.status(200).json(theUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const newUser = req.body;
  const { full_name } = req.body;
  try {
    const checkUser = await users.getSingleUser(full_name);
    if (!checkUser) {
      if (full_name === "") {
        res.status(400).json({ Error: "The name must be provided" });
      } else {
        const theNewUser = await users.addNewUser(newUser);
        res.status(201).json(theNewUser);
      }
    } else {
      res.status(409).json({ Error: "The name must be unique" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
