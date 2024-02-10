const EventEmitter = require("events");


class Logger extends EventEmitter{
    log(message){
        console.log(message);        
        this.emit("logging", {data:"All good all clear"})
   }

}
module.exports = Logger;