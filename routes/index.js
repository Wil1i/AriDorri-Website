const express = require("express")
const Router = new express.Router()

const suggestionsHandler = require("../controllers/suggestionsHandler")
Router.get("/suggestions", suggestionsHandler.get)

module.exports = Router