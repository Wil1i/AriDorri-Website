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

const post = async (req, res) => {
  const findUser = await User.findByPk(req.query.user);
  if (req.query.user == req.user.id) {
    req.flash("danger", "شما توانایی آپدیت کردن خود را ندارید");
    return res.redirect("/dashboard/users");
  }

  if (findUser) {
    if (req.query.activity == "rank") {
      if (findUser.userRank == req.body.rank) {
        req.flash("danger", "مقام فرد تغییری نکرد");
        return res.redirect("/dashboard/users");
      }

      findUser
        .update({
          userRank: req.body.rank,
        })
        .then(() => {
          req.flash("success", "مقام کاربر با موفقیت آپدیت شد");
        });
    } else if (req.query.activity == "delete") {
      await findUser.destroy().then(() => {
        req.flash("success", "کاربر مورد نظر با موفقیت حذف شد.");
      });
    }
  } else {
    req.flash("danger", "کاربر مورد نظر یافت نشد");
  }
  res.redirect("/dashboard/users");
};

module.exports = {
  get,
  post,
};
