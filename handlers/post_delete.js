const fs = require("fs");
const { DeleteTodo } = require("../dbactions.js");

function PostDelete(req, res) {
  if(!req.session.loggedin) return res.redirect("/");
  if(!req.body || !req.body.userid || !req.body.action || !req.body.action === "delete" || !req.body.todotext || !req.body.todotext === "todo" || !req.body.tid) return res.redirect("/");
  if(!req.session.userid === req.body.userid) return res.redirect("/");
  
  const todos = JSON.parse(fs.readFileSync("./json/todos.json", "utf8"));
  
  const receivedTodo = {
    userid: req.body.userid,
    action: req.body.action,
    todotext: req.body.todotext,
    tid: req.body.tid
  }
  //console.log(receivedTodo);

  const todo = todos.find(t => t.id === req.body.tid);
  if(!todo) return res.redirect("/");
  
  require("../logger.js").Log("delete", [ req.session.username, req.session.userid, req.clientIp, todo ? todo.name : null, req.body.tid ]);

  const filtered = todos.filter(t => t.id !== req.body.tid);

  fs.writeFile("./json/todos.json", JSON.stringify(filtered), err => {
    if(err) console.error(err);
  });

  //DeleteTodo(req.body.tid);

  return res.json({ redirect: `//${req.hostname}/` });
}

module.exports = { PostDelete }