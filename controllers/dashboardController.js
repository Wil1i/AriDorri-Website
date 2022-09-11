const rankConverter = require("../helpers/rankConverter");
const permission = require("../helpers/userPermissions");

const get = (req, res) => {
  res.render("dashboard", {
    user: req.user,
    flash: req.flash(),
    rankConverter,
    permission,
  });
};

module.exports = {
  get,
};
