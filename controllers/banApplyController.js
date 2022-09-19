const rankConverter = require("../helpers/rankConverter");
const twitchBans = require("../models/twitchBans");
const permission = require("../helpers/userPermissions");

const get = async (req, res) => {
  const tBans = await twitchBans.findAll();

  res.render("banApply", {
    user: req.user,
    flash: req.flash(),
    permission,
    rankConverter,
    tBans,
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
