import LoggerService from "../services/LoggerService.js";

const logger = new LoggerService();

const attachLogger = (req,res,next) =>{
    req.logger = logger.logger;
    console.log(logger.logger);
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
}


export default attachLogger;