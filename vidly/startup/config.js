import config from "config"
import { logger } from "./logging.js"


export function configuration(){

    if(!config.get("jwtPrivateKey")){
        logger.error("Fatal Error jwt private key is not defined")
        
    }
}
