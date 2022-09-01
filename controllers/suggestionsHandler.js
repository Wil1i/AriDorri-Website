const axios = require("axios");
const Suggest = require("../models/Suggest");

const get = async (req, res) => {
  const suggestions = await Suggest.findAll();

  res.render("suggestions", {
    suggestions,
  });
};

const post = async (req, res) => {
  const suggestion = await Suggest.findByPk(req.query.id);

  if (suggestion && req.body.mode == "accept") {
    await axios
      .post(`http://localhost:3000/sendMsg?id=${suggestion.disId}`, {
        message: `Ba salam va khaste nabashid. Suggestion shoma tavasote team developer AriDorri barresi va accept shod.\n\n\nMatne suggestion : ${suggestion.text}\n\nBa tashakor az shoma. AriDorri STAFF`,
      })
      .then(async (result) => {
        if (result.data["status"] == "sent") {
          await suggestion.update({ isAccepted: "yes" });

          req.flash("success", "Message successfully sent");
          res.redirect("/suggestions");
        } else {
          await suggestion.update({ isAccepted: "no" });

          req.flash("danger", "Can't send message to this user");
          res.redirect("/suggestions");
        }
      })
      .catch((error) => {});
  } else if (suggestion && req.body.mode == "declined") {
    await axios.post(`http://localhost:3000/sendMsg?id=${suggestion.disId}`, {
      message: `Ba salam va khaste nabashid. Mamnoon az inke suggestion khod ra sabt kardid.\nSuggestion shoma tavasote developer va admin ha barresi shod ama moteasefane rad shod.\n\n\nMatne suggestion : ${suggestion.text}\n\nBa tashakor az shoma. AriDorri STAFF`,
    });
    await suggestion.destroy();
    req.flash("success", "Successfully deleted suggestion.");
    res.redirect("/suggestions");
  }
};

module.exports = {
  get,
  post,
};
