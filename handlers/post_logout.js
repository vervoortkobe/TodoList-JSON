function PostLogout(req, res) {
  if(req.session.loggedin) {
    require("../logger.js").Log("logout", [ req.session.username, req.session.userid, req.clientIp ]);
    
		req.session.destroy();
		return res.redirect("/");
  } else return res.redirect("/");
}

module.exports = { PostLogout }