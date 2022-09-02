const express = require("express");
const Router = new express.Router();
const { isUserMod, isUserLoggedIn } = require("../helpers/auth");

const dashboardController = require("../controllers/mods/dashboard");
Router.get("/dashboard", isUserLoggedIn, isUserMod, dashboardController.get);

module.exports = Router;
