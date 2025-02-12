//PRELOAD
function preload() {
  const body = document.getElementById("body");
  setTimeout(() => {
    document.getElementById("preload").style.display = "none";
    document.getElementById("pagecontent").style.display = "block";
    if(!body.classList.contains("dark-mode")) body.style.backgroundColor = "white";
  }, 500);
}
preload();
//PREP PRELOAD
function prepPreload() {
  body.style.backgroundColor = "#25282c";
  document.getElementById("preload").style.display = "flex";
  document.getElementById("pagecontent").style.display = "none";
}
//TOGGLE THEME
function toggleTheme() {
  prepPreload();
  preload();
  const body = document.getElementById("body");
  if(body.classList.contains("dark-mode")) { //light mode
    postTheme("light");
    body.classList.remove("dark-mode");
  } else { //dark mode
    postTheme("dark");
    body.classList.add("dark-mode");
  }
}
//POST THEME
async function postTheme(theme) {
  const res = await fetch("./theme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({theme: theme})
  });
  return res.json();
}
//LOOKUP
function lookup() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("searchbar");
  filter = input.value.toUpperCase();
  ul = document.getElementById("todos");
  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
//POST FUNC
async function post(element_id, action) {
  if(action === "delete" && element_id.includes("todobtn")) {
    //todobtn-${req.session.userid}_todo*${t.id}
    const atodobtn = element_id.split("-")[0];
    const arest = element_id.split("-")[1];
    const userid = arest.split("_")[0];
    const brest = arest.split("_")[1];
    const todotext = brest.split("*")[0];
    const crest = brest.split("*")[1];
    const tid = crest;

    if(action === "delete") {
      await fetch(`//${window.location.host}/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userid: userid,
          action: "delete",
          todotext: todotext,
          tid: tid
        })
      }).then(res => { return res.json(); })
      .then(data => {
        console.log(data);
        return window.location.href = data.redirect;
      }).catch(err => {
        console.error(err);
        return window.location.reload();
      });
    }
  }
}