import 'winston-mongodb';
import winston, { transports } from "winston"


let alignColorsAndTime = winston.format.combine(
    winston.format.colorize({
        all:true
    }),
    winston.format.label({
        label:'[LOGGER]'
    }),
    winston.format.timestamp({
        format:"YY-MM-DD HH:mm:ss"
    }),
    winston.format.printf(
        info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
    )
);


export const logger = winston.createLogger({
    level: 'info', //this means info and above 
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
        ,alignColorsAndTime
      ),
   
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
      new winston.transports.Console()
    ],
});

logger.exceptions.handle(
new transports.File({filename : "unCaughtExceptions.log"}),
    // new transports.Console({colorize: true, prettyPrint: true})
)
    
    
    
    // logging to Mongodb
const url = "mongodb://localhost/vidly-app";
logger.add(new winston.transports.MongoDB(
    {
        db:url,  
        collection:'log', 
        options: {
            useUnifiedTopology: true
        }
    }
));


// process.on('uncaughtException', (ex) => {
//     logger.log('error', ex.message)
//     process.exit(1)
// })




// process.on('unhandledRejection', (ex) => {
//     logger.log('error', ex.message)
//     console.log("We caught an unhandled Rejection", ex.message)
// })






