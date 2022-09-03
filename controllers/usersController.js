const User = require("../models/User");
const rankConverter = require("../helpers/rankConverter");

const get = async (req, res) => {
  const allUsers = await User.findAll();
  res.render("users", {
    allUsers,
    user: req.user,
    flash: req.flash(),
    rankConverter,
  });
};

module.exports = {
  get,
};
