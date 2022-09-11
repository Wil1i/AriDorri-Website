const {
  isUserNotLoggedIn,
  isUserLoggedIn,
  isUserSuperMod,
  isUserMod,
} = require("../helpers/auth");
const express = require("express");
const Router = new express.Router();

const homePageController = require("../controllers/homePageController");
Router.get("/", homePageController.get);

const suggestionsHandler = require("../controllers/suggestionsHandler");
Router.get(
  "/suggestions",
  isUserLoggedIn,
  isUserSuperMod,
  suggestionsHandler.get
);
Router.post(
  "/suggestions",
  isUserLoggedIn,
  isUserSuperMod,
  suggestionsHandler.post
);

const loginController = require("../controllers/loginController");
Router.get("/login", isUserNotLoggedIn, loginController.get);
Router.post(
  "/login",
  isUserNotLoggedIn,
  loginController.post,
  loginController.loginSuccess
);

const registerController = require("../controllers/registerController");
Router.get("/register", isUserNotLoggedIn, registerController.get);
Router.post("/register", isUserNotLoggedIn, registerController.post);

const dashboardController = require("../controllers/dashboardController.js");
Router.get("/dashboard", isUserLoggedIn, dashboardController.get);

const logoutController = require("../controllers/logoutController");
Router.get("/logout", logoutController.get);

const usersController = require("../controllers/usersController");
Router.get(
  "/dashboard/users",
  isUserLoggedIn,
  isUserSuperMod,
  usersController.get
);
Router.post(
  "/dashboard/users",
  isUserLoggedIn,
  isUserSuperMod,
  usersController.post
);

const applyBanController = require("../controllers/banApplyController");
Router.get(
  "/dashboard/submitban",
  isUserLoggedIn,
  isUserMod,
  applyBanController.get
);
Router.post(
  "/dashboard/submitban",
  isUserLoggedIn,
  isUserMod,
  applyBanController.post
);

Router.get("*", (req, res) => {
  res.render("error", { code: 404, msg: "Page not found" });
});

module.exports = Router;
