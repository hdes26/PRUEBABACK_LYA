const { response, request } = require("express");
const {list, listById, create, update, remove, activate} = require("../services/user.service.js");




const getUsers = async (req = request, res = response) => {
  try {
    let users = await list();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error });
  }
};

const getUser = async (req, res = response) => {
  try {
    let user = await listById(req.body);
    res.json(user);
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

const createUser = async (req, res) => {
  try {
    let user = await create(req.body);
    res.json(user);
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};
const updateUser = async (req, res) => {
  try {
    let user = await update(req.body);
    res.json(user);
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    let user = await remove(req.body);
    res.json(user);
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};
const activateUser = async (req, res) => {
  try {
    let user = await activate(req.body);
    res.json(user);
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  activateUser
};
