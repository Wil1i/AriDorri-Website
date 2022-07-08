const User = require("../models/User")
const config = require("../configs/config.json")

// ?----------- Check if user is logged in
const isUserLoggedIn = (req, res, next) => {

    if(!req.user){

        req.flash("warning", "You must be logged in to view this page")
        req.session.redirectTo = req.url;
        return res.redirect("/login");

    }

    next();
}

// ?----------- Check if user is not logged in
const isUserNotLoggedIn = (req, res, next) => { 

    if(req.user) return res.redirect("/dashboard")
    next()
}

// ?----------- Chcek if user have admin rank
const isUserAdmin = (req, res, next) => { 

    if(req.user.userRank !== "admin") return res.redirect("/dashboard")
    next()

}

// ?----------- Chcek if user have moderator or super moderator rank on stream
const isUserMod = async (req, res, next) => {

    if(!req.user){
        return res.status(403).render("error", config.errors[403])
    }

    const findUser = await User.User.findOne({
        where : {
            username : req.user.username
        }
    })

    if(findUser && (findUser.userRank == "mod" || findUser.userRank == "super mod" || findUser.userRank == "developer" || findUser.userRank == "owner")){
        next()
    }else{
        return res.status(403).render("error", config.errors[403])
    }

}

module.exports = {
    isUserLoggedIn,
    isUserNotLoggedIn,
    isUserAdmin,
    isUserMod
}