const { response, request } = require("express");
const { listService, listByIdService, createService, updateService, removeService, activateService } = require("../services/user.service.js");




const getUsers = async (req = request, res = response) => {
  try {
    let users = await listService();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error });
  }
};

const getUser = async (req, res = response) => {
  try {
    const { id } = req.params;
    let user = await listByIdService(id);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error });
  }
};

const createUser = async (req, res) => {
  try {
    let user = await createService(req.body);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error });
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    let user = await updateService( id, req.body );
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await removeService(id);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error });
  }
};
const activateUser = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await activateService(id);
    res.json(user);
  } catch (error) {
    console.log(error);
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
