const convert = (rank) => {
  const convertedRanks = {
    user: "کاربر",
    moderator: "ادمین",
    "super moderator": "مدیر",
    developer: "توسعه دهنده",
    owner: "مدیر کل",
  };

  return convertedRanks[rank] ? convertedRanks[rank] : null;
};

module.exports = convert;
