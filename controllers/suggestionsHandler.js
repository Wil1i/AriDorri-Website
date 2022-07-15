const axios = require("axios")
const Suggest = require("../models/Suggest")

const get = async (req, res) => {
    const suggestions = await Suggest.findAll();

    res.render("suggestions", {
        suggestions
    })
}

const post = async (req, res) => {
    console.log("Start sending request")
    const suggestion = await Suggest.findByPk(req.query.id)
    console.log(`The suggestion is`, suggestion)
    if(suggestion && req.body.mode == 'accept'){
        console.log("Mode is accept. Sending...")
        await axios.post(`http://localhost:3000/sendMsg?id=${suggestion.disId}`, {test : 1}).then(result => {
            if(result.data['status'] == "sent"){
                req.flash("success", "Message successfully sent")
                res.redirect("/suggestions")
            }else{
                req.flash("danger", "Can't send message to this user")
                res.redirect("/suggestions")
            }
        }).catch(error => {
            console.log("Error!", error)
        })
    }else if(suggestion && req.body.mode == 'declined'){
        console.log("Mode is decline, deleting...")
        suggestion.destroy()
        req.flash("success", "Successfully deleted suggestion.")
        res.redirect("/suggestions")
    }
}

module.exports = {
    get,
    post
}