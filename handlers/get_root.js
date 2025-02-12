const fs = require("fs");

function GetRoot(req, res) {
  if(req.session.loggedin) {
    require("../logger.js").Log("root", [ req.session.username, req.session.userid, req.clientIp ]);
    
    const todo = fs.readFileSync("./handlers/html/todo.html", "utf8");
    const todos = JSON.parse(fs.readFileSync("./json/todos.json", "utf8"));

    const theme = require("../dbactions.js").FindTheme(req.session.userid);

    const filtered = todos.filter(t => t.userid === req.session.userid);
    const sorted = filtered;
    sorted.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    function shortenDots(str, length) {
      if(str.length >= length) return str.substr(0, length) + "...";
      else return str;
    }
    
    let htmlTodos = "";
    if(filtered.length === 0) {
      htmlTodos = "Still waiting for you to add an extra todo...";
    } else {
      htmlTodos += `<div id="searchdropdown" class="searchdropdown">
        <input type="search" id="searchbar" class="form-control me-sm-2 searchbar" onkeyup="lookup()" placeholder="Search for one of your Todo's to manage..." />
          <ul id="todos" class="todos">`;
      
      htmlTodos += sorted.map(t => {
        return `<li class="todo" id="${t.id}"><a class="tid"><b>${shortenDots(t.name, 6)}</b></a>
        <a class="tdescription">${shortenDots(t.description, 23)}</a><a class="tdate">${new Date(t.date).getDate()}/${new Date(t.date).getMonth() + 1}/${new Date(t.date).getFullYear()}<button type="button" class="btn btn-primary todobtn" id="todobtn-${req.session.userid}_todo*${t.id}" onclick="post(this.id, 'manage')">Manage</button></a></li>`;
      }).join("");

      htmlTodos += `</ul>
        </div>`;
    }
    
    return res.send(
    todo.toString()
    .replaceAll("${req.session.avatar}", req.session.avatar)
    .replaceAll("${req.session.username}", req.session.username)
    .replaceAll("${theme}", theme.theme === "dark" ? 'class="dark-mode"' : "")
    .replaceAll("${htmlTodos}", htmlTodos)
  );
  } else {
    const login = fs.readFileSync("./handlers/html/login.html", "utf8");

    let error = "<br>";
    if(req.session.loginError) {
      error = `<a style="font-size: 12px; max-height: 1vh; text-decoration: none;">❌ <i>Error logging you in!</b></i></a><br>`;
      if(error === "<br>") require("../logger.js").Log("root_undefined", [ req.clientIp ]);
      else require("../logger.js").Log("root_login_err", [ req.clientIp ]);
    }
    else if(req.session.registerError) {
      error = `<a style="font-size: 12px; max-height: 1vh; text-decoration: none;">❌ <i>This username is taken!</b></i></a><br>`;
      if(error === "<br>") require("../logger.js").Log("root_undefined", [ req.clientIp ]);
      else require("../logger.js").Log("root_register_err", [ req.clientIp ]);
    }
    
    res.send(
      login.toString()
      .replaceAll("${loginError}", error)
    );
    delete req.session.loginError;
    delete req.session.registerError;
    return;
  }
}

module.exports = { GetRoot }