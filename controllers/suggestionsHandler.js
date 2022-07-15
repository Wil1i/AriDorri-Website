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

        await axios.post(`http://localhost:3000/sendMsg?id=${suggestion.disId}`, {test : 1}).then(async result => {

            if(result.data['status'] == "sent"){

                await suggestion.update({ isAccepted : "yes" })

                req.flash("success", "Message successfully sent")
                res.redirect("/suggestions")

            }else{

                await suggestion.destroy()

                req.flash("danger", "Can't send message to this user")
                res.redirect("/suggestions")

            }

        }).catch(error => {})

    }else if(suggestion && req.body.mode == 'declined'){

        await suggestion.destroy()
        req.flash("success", "Successfully deleted suggestion.")
        res.redirect("/suggestions")

    }
}

module.exports = {
    get,
    post
}