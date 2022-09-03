const convert = (rank) => {
  const convertedRanks = {
    user: "کاربر",
    editor: "ادیتور",
    moderator: "مدیر استریم",
    "discord manager": "مدیر دیسکورد",
    "super moderator": "مدیر",
    developer: "توسعه دهنده",
    owner: "مدیر کل",
  };

  return convertedRanks[rank] ? convertedRanks[rank] : null;
};

module.exports = convert;
