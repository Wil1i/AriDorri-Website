const express = require("express");
const config = require("./configs/config.json");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(cookieParser());
app.use(session({ secret: config.app.secret }));
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());

require("./helpers/passport");

const modsRoutes = require("./routes/mods");
app.use("/moderators", modsRoutes);

const socialsRoutes = require("./routes/socials");
app.use("/", socialsRoutes);

const routes = require("./routes");
app.use("/", routes);

app.listen(config.app.port, () => {
  console.log(`Server is listening to ${config.app.port}`);
});
