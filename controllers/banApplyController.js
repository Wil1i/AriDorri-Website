const rankConverter = require("../helpers/rankConverter");
const twitchBans = require("../models/twitchBans");
const permission = require("../helpers/userPermissions");

const get = (req, res) => {
  res.render("banApply", {
    user: req.user,
    flash: req.flash(),
    permission,
    rankConverter,
  });
};

const post = async (req, res) => {
  await twitchBans
    .create({
      username: req.body.twitchName,
      reason: req.body.reason,
      executor: req.user.username,
    })
    .then(() => {
      req.flash("success", "کاربر مورد نظر با موفقیت ثبت بن شد.");
    });
  res.redirect("/dashboard/submitban");
};

module.exports = {
  get,
  post,
};
