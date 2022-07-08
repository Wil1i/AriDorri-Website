const express = require("express")
const Router = new express.Router()
const { isUserMod } = require("../helpers/auth")

const dashboardController = require("../controllers/mods/dashboard")
Router.get("/dashboard", isUserMod, dashboardController.get)

module.exports = Router