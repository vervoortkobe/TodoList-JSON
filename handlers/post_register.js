const fs = require("fs");

function PostRegister(req, res) { 
  if(req.session.loggedin) return res.redirect("/");
  
	if(req.body.username && req.body.password && req.body.submit && req.body.submit === "Register") {
    const logins = require("../json/logins.json");
    if(!logins.find(l => l.username === req.body.username)) {
      req.session.loggedin = true;
      req.session.username = req.body.username;
      req.session.userid = req.body.username;
      req.session.password = req.body.password;
      req.session.avatar = "https://cdn.discordapp.com/embed/avatars/0.png";

      logins.push({ "username": req.body.username, "password": req.body.password });
      fs.writeFile("./json/logins.json", JSON.stringify(logins), err => {
        if(err) console.error(err);
      });
      
      require("../logger.js").Log("register", [ req.session.username, req.session.userid, req.clientIp ]);
      
      return res.redirect("/");
    } else {
      req.session.registerError = true;
      return res.redirect("/");
    }
  }
}

module.exports = { PostRegister }