const fs = require("fs");

function PostAuth(req, res) {
  if(req.session.loggedin) return res.redirect("/");
	if(req.body.username && req.body.password && req.body.submit) {
    if(req.body.submit === "Register") return require("./post_register.js").PostRegister(req, res);
    else if(req.body.submit === "Login") {
      
      const logins = require("../json/logins.json");
      if(logins.find(l => l.username === req.body.username)) {
        if(logins.find(l => l.username === req.body.username && l.password === req.body.password)) {
          
          req.session.loggedin = true;
          req.session.username = req.body.username;
          req.session.userid = req.body.username;
          req.session.password = req.body.password;
          req.session.avatar = "https://cdn.discordapp.com/embed/avatars/0.png";
  
          require("../logger.js").Log("auth", [ req.session.username, req.session.userid, req.clientIp ]);
          
          return res.redirect("/todo");
        } else {
          req.session.loginError = true;
          return res.redirect("/");
        }
      } else {
        req.session.loginError = true;
        return res.redirect("/");
      }
    } else {
      req.session.loginError = true;
      return res.redirect("/");
    }
  } else {
    req.session.loginError = true;
    return res.redirect("/");
  }
}

module.exports = { PostAuth }