const rankConverter = require("../helpers/rankConverter");
const permission = require("../helpers/userPermissions");

const get = (req, res) => {
  res.render("banApply", {
    user: req.user,
    flash: req.flash(),
    permission,
    rankConverter,
  });
};

const post = (req, res) => {};

module.exports = {
  get,
  post,
};
