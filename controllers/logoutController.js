const get = (req, res) => {
  req.logout();
  res.redirect("/");
};
module.exports = {
  get,
};
