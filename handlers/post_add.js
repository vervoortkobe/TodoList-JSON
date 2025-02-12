const fs = require("fs");
const { AddTodo } = require("../dbactions.js");

function genId() {
  let id = "";
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(let i = 0; i < 15; i++) {
    id += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return id;
}

function PostAdd(req, res) {
  if(!req.session.loggedin) return res.redirect("/");
  if(!req.body || !req.body.name || !req.body.date || !req.body.description) return res.redirect("/");
  
  const todos = JSON.parse(fs.readFileSync("./json/todos.json", "utf8"));
  
  const id = genId();
  while(todos.find(t => t.id === id)) id = genId();
  const todo = {
    id: id,
    userid: req.session.userid,
    name: req.body.name,
    date: req.body.date,
    description: req.body.description
  }

  //console.log(todo);
  
  require("../logger.js").Log("add", [ req.session.username, req.session.userid, req.clientIp, req.body.name, id ]);

  AddTodo(todo);

  return res.redirect("/");
}

module.exports = { PostAdd }