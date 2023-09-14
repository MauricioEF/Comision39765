import winston from "winston";
import config from "../config/config.js";

export default class LoggerService {
    constructor(){
        this.options = {
            levels: {
                fatal: 0,
                error: 1,
                warning: 2,
                http: 3,
                info: 4,
                debug: 5,
              }
        },
        this.logger = this.createLogger();
    }
    createLogger = () =>{
        console.log(config.app.LOGGER_ENV);
        switch(config.app.LOGGER_ENV) {
            case "dev":
                return winston.createLogger({
                    levels: this.options.levels,
                    transports: [
                        new winston.transports.Console({level:"info",
                        format: winston.format.simple()
                    })
                    ]
                })
            case "prod":
                return winston.createLogger({
                    levels: this.options.levels,
                    transports: [
                        new winston.transports.Console({level:"http"}),
                        new winston.transports.File({level:"warning",filename:'./errors.log'})
                    ]
                })
        }
    }
}