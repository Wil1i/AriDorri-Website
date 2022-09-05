const {
  isUserNotLoggedIn,
  isUserLoggedIn,
  isUserSuperMod,
} = require("../helpers/auth");
const express = require("express");
const Router = new express.Router();

const homePageController = require("../controllers/homePageController");
Router.get("/", homePageController.get);

const suggestionsHandler = require("../controllers/suggestionsHandler");
Router.get("/suggestions", isUserSuperMod, suggestionsHandler.get);
Router.post("/suggestions", suggestionsHandler.post);

const loginController = require("../controllers/loginController");
Router.get("/login", isUserNotLoggedIn, loginController.get);
Router.post("/login", loginController.post, loginController.loginSuccess);

const registerController = require("../controllers/registerController");
Router.get("/register", isUserNotLoggedIn, registerController.get);
Router.post("/register", registerController.post);

const dashboardController = require("../controllers/dashboardController.js");
Router.get("/dashboard", isUserLoggedIn, dashboardController.get);

const logoutController = require("../controllers/logoutController");
Router.get("/logout", logoutController.get);

const usersController = require("../controllers/usersController");
Router.get("/dashboard/users", isUserLoggedIn, usersController.get);

Router.get("*", (req, res) => {
  res.render("error", { code: 404, msg: "Page not found" });
});

module.exports = Router;
