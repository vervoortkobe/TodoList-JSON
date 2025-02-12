const fs = require("fs");
const { SetTheme, AddTheme } = require("../dbactions.js");

function PostTheme(req, res) {
  if(!req.body || !req.body.theme) req.body.theme = "dark"; //no theme set yet, dark theme default
  const themes = JSON.parse(fs.readFileSync("./json/themes.json", "utf8"));

  require("../logger.js").Log("theme", [ req.session.username, req.session.userid, req.clientIp, req.body.theme ]);

  const theme = themes.find(t => t.userid === req.session.userid);
  if(theme) SetTheme(theme, req.body.theme); //set theme to preferred value
  else {
    const theme = {
      userid: req.session.userid,
      theme: req.body?.theme
    }
    AddTheme(theme);
  }
  //console.log(themes);
}

module.exports = { PostTheme }