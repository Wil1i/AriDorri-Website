const Suggest = require("../models/Suggest")

const get = async (req, res) => {
    const suggestions = await Suggest.findAll();

    res.render("suggestions", {
        suggestions
    })
}

module.exports = {
    get
}