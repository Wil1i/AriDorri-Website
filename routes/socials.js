const express = require("express");
const config = require("../configs/config.json");
const Router = new express.Router();

Router.get("/instagram", (req, res) => {
  res.redirect(config.socials.instagram);
});

Router.get("/ig", (req, res) => {
  res.redirect(config.socials.instagram);
});

Router.get("/telegram", (req, res) => {
  res.redirect(config.socials.telegram);
});

Router.get("/tel", (req, res) => {
  res.redirect(config.socials.telegram);
});

Router.get("/youtube", (req, res) => {
  res.redirect(config.socials.youtube);
});

Router.get("/yt", (req, res) => {
  res.redirect(config.socials.youtube);
});

Router.get("/discord", (req, res) => {
  res.redirect(config.socials.discord);
});

Router.get("/dis", (req, res) => {
  res.redirect(config.socials.discord);
});

Router.get("/donate/tip", (req, res) => {
  res.redirect(config.socials.paypal);
});

Router.get("/donate", (req, res) => {
  res.redirect(config.socials.reymit);
});

Router.get("/guilded", (req, res) => {
  res.redirect(config.socials.guilded);
});

Router.get("/twitch", (req, res) => {
  res.redirect(config.socials.twitch);
});

module.exports = Router;
