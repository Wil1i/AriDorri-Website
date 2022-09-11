const User = require("../models/User");
const axios = require("axios");
const rankConverter = require("../helpers/rankConverter");
const permission = require("../helpers/userPermissions");

const get = async (req, res) => {
  const allUsers = await User.findAll();
  res.render("users", {
    allUsers,
    user: req.user,
    flash: req.flash(),
    rankConverter,
    permission,
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

      // Mod kicked controller start
      if (
        (findUser.userRank == "super moderator" ||
          findUser.userRank == "moderator") &&
        req.body.rank == "user" &&
        findUser.disId
      ) {
        await axios.post(
          `http://localhost:3000/modKicked?userId=${findUser.disId}`
        );
      }
      // Mod kicked controller end

      findUser
        .update({
          userRank: req.body.rank,
        })
        .then(() => {
          req.flash("success", "مقام کاربر با موفقیت آپدیت شد");
        });
    } else if (req.query.activity == "delete") {
      if (
        (findUser.userRank == "super moderator" ||
          findUser.userRank == "moderator") &&
        findUser.disId
      ) {
        await axios.post(
          `http://localhost:3000/modKicked?userId=${findUser.disId}`
        );
      }
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
