const get = (req, res) => {
  res.render("dashboard", {
    user: req.user,
    flash: req.flash(),
  });
};

module.exports = {
  get,
};
