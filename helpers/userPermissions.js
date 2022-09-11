const User = require("../models/User");

const isUserModerator = async (user) => {
  const findUser = await User.findByPk(user.id);

  if (!findUser) return null;

  const moderatorRanks = ["moderator", "super moderator", "developer", "owner"];

  return moderatorRanks.includes(findUser.userRank);
};

const isUserSuperModerator = async (user) => {
  const findUser = await User.findByPk(user.id);

  if (!findUser) return null;

  const moderatorRanks = ["super moderator", "developer", "owner"];

  return moderatorRanks.includes(findUser.userRank);
};

module.exports = {
  isUserModerator,
  isUserSuperModerator,
};
