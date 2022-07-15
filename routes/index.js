const express = require("express")
const Router = new express.Router()

const suggestionsHandler = require("../controllers/suggestionsHandler")
Router.get("/suggestions", suggestionsHandler.get)
Router.post("/suggestions", suggestionsHandler.post)

Router.get("*", (req, res) => {
    res.render("error", {code : 404, msg : "Page not found"})
})

module.exports = Router