require("dotenv").config();

function Log(handler, params) {
  switch(handler) {
    case "dauth":
      console.log(`> ${params[0]} (${params[1]})${Boolean(process.env.IPLOGGING) === true ? ` ${params[2]}` : ""} logged in using Discord!`);
      break;
      
    case "root":
      console.log(`> ${params[0]} (${params[1]})${Boolean(process.env.IPLOGGING) === true ? ` ${params[2]}` : ""} visited /!`);
      break;
    
    case "root_undefined":
      console.log(`> ${Boolean(process.env.IPLOGGING) === true ? params[0] : "Someone"} visited /!`);
      break;
    
    case "root_login_err":
      console.log(`> ${Boolean(process.env.IPLOGGING) === true ? params[0] : "Someone"} tried logging in /: ❌ Error logging you in!`);
      break;
    
    case "root_register_err":
      console.log(`> ${Boolean(process.env.IPLOGGING) === true ? params[0] : "Someone"} tried registering /: ❌ This username is taken!`);
      break;
    
    case "add":
      console.log(`> ${params[0]} (${params[1]})${Boolean(process.env.IPLOGGING) === true ? ` ${params[2]}` : ""} added a new todo: ${params[3]} (${params[4]})!`);
      break;
    
    case "auth":
      console.log(`> ${params[0]} (${params[1]})${Boolean(process.env.IPLOGGING) === true ? ` ${params[2]}` : ""} logged in!`);
      break;
    
    case "delete":
      console.log(`> ${params[0]} (${params[1]})${Boolean(process.env.IPLOGGING) === true ? ` ${params[2]}` : ""} ${params[3] === null ? "tried deleting" : "deleted"} a todo: ${params[3]} (${params[4]})!`);
      break;
    
    case "logout":
      console.log(`> ${params[0]} (${params[1]})${Boolean(process.env.IPLOGGING) === true ? ` ${params[2]}` : ""} logged out!`);
      break;
    
    case "register":
      console.log(`> ${params[0]} (${params[1]})${Boolean(process.env.IPLOGGING) === true ? ` ${params[2]}` : ""} registered and logged in!`);
      break;
    
    case "theme":
      console.log(`> ${params[0]} (${params[1]})${Boolean(process.env.IPLOGGING) === true ? ` ${params[2]}` : ""} set his/her theme to ${params[3]} mode!`);
      break;

    default:
      console.log(`> Default log!`);
      break;
  }
}

module.exports = { Log }