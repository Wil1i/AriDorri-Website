const rankConverter = require("../helpers/rankConverter");

const get = (req, res) => {
  res.render("dashboard", {
    user: req.user,
    flash: req.flash(),
    rankConverter,
  });
};

module.exports = {
  get,
};
