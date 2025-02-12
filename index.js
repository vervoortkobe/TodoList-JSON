const express = require("express");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const session = require("express-session");
const requestIp = require("request-ip");
require("dotenv").config();
const PORT = 3000;

const app = express();

app.use(session({
	secret: process.env.EXPRESS_APP_SESSIONSECRET,
	resave: true,
	saveUninitialized: true
}));

//app.use(morgan("dev"));
app.use(requestIp.mw());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));

app.get("/dauth", (req, res) =>  { require("./handlers/get_dauth.js").GetDauth(req, res) });
app.get("/", (req, res) => {
  //req.session.loggedin = true;
  //req.session.userid = "test";
  require("./handlers/get_root.js").GetRoot(req, res);
});
app.post("/add", (req, res) => { require("./handlers/post_add.js").PostAdd(req, res) });
app.post("/auth", (req, res) => { require("./handlers/post_auth.js").PostAuth(req, res) });
app.post("/delete", (req, res) => { require("./handlers/post_delete.js").PostDelete(req, res) });
app.post("/logout", (req, res) => { require("./handlers/post_logout.js").PostLogout(req, res) });
app.post("/register", (req, res) => { require("./handlers/post_register.js").PostRegister(req, res) });
app.post("/theme", (req, res) => { require("./handlers/post_theme.js").PostTheme(req, res) });

app.get("/dlogin", (req, res) => { return res.redirect(process.env.AUTHURL) });
app.get("/ping", (req, res) => { return res.send("online"); });
app.get("*", (req, res) => { return res.redirect("/"); });
app.post("*", (req, res) => { return res.redirect("/"); });

const listener = app.listen(PORT, () => {
  console.log(`⚡ | WebServer listening on [http://localhost:${listener.address().port}]!`);
});
