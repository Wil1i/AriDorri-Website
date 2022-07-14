const axios = require("axios")
const Suggest = require("../models/Suggest")

const get = async (req, res) => {
    const suggestions = await Suggest.findAll();

    res.render("suggestions", {
        suggestions
    })
}

const post = async (req, res) => {
    const suggestion = await Suggest.findByPk(req.query.id)
    if(suggestion && req.body.mode == 'accept'){
        axios.post("http://localhost:3000/sendMsg", {
            id : suggestion.disId
        }).then(res => {
            if(req.data.status == "sent"){
                req.flash("success", "Message successfully sent")
                res.redirect("/suggestions")
            }else{
                req.flash("danger", "Can't send message to this user")
                res.redirect("/suggestions")
            }
        }).catch(error => {})
    }else if(suggestion && req.body.mode == 'declined'){
        suggestion.destroy()
        req.flash("success", "Successfully deleted suggestion.")
        res.redirect("/suggestions")
    }

    res.redirect("/suggestions")
}

module.exports = {
    get,
    post
}