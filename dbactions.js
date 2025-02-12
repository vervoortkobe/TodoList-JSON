const fs = require("fs");

const themes = JSON.parse(fs.readFileSync("./json/themes.json", "utf8"));
const todos = JSON.parse(fs.readFileSync("./json/todos.json", "utf8"));
const logins = JSON.parse(fs.readFileSync("./json/logins.json", "utf8"));

function FindTheme(userid) {
  let theme = themes.find(t => t.userid === userid);
  if(!theme) theme = { userid: userid, theme: "dark" }
  return theme;
}

function AddTodo(todo) {
  todos.push(todo);
  fs.writeFile("./json/todos.json", JSON.stringify(todos), err => {
    if(err) console.error(err);
  });
}

/*function DeleteTodo(id) {
  const filtered = todos.filter(t => t.id !== id);

  fs.writeFile("./json/todos.json", JSON.stringify(filtered), err => {
    if(err) console.error(err);
  });
}*/

function SetTheme(theme, newTheme) {
  theme.theme = newTheme;
  
  fs.writeFile("./json/themes.json", JSON.stringify(themes), (err) => {
    if(err) console.log(err);
  });
}

function AddTheme(theme) {
  themes.push(theme);
  
  fs.writeFile("./json/themes.json", JSON.stringify(themes), (err) => {
    if(err) console.log(err);
  });
}

module.exports = { FindTheme, AddTodo, /*DeleteTodo,*/ SetTheme, AddTheme }