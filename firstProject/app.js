const logged = require("./logger");
const path = require("path")
const os = require("os");
const fs = require("fs");


function err(message){
    console.log(message)
}

const files = fs.mkdir("./fs",true, function(error,path){
    if(error) return err(err.message)

    console.log("Nice day")
})



const osObj = os.totalmem();
console.log(osObj)

const pathObj= path.parse(__filename);
console.log(pathObj)

console.log(logged)
logged.log("Its a good day to be alive");