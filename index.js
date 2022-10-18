import pino from 'pino';
import pretty from 'pino-pretty';

const logger = pino({
  enabled: process.env.ENABLE_LOGS === 'true',
  level: 'debug',
}, pretty({
  include: '.',
  ignore: 'pid,hostname,level,time',
  useOnlyCustomProps: true,
  messageFormat: (log) => {
    const messageKeysPriority = [ 'msg', 'message'];
    let message = '';
    for(const key of messageKeysPriority) {
      if(log[key]){
        message = log[key];
        break;
      }
    }
    const keyValues = Object.keys(log).map((key) => {
      if(messageKeysPriority.includes(key)){
         return "";
      }
      if(key==='time') {
        return `${key}=${JSON.stringify(new Date(log[key]).toISOString())}`;
      }
      return `${key}=${JSON.stringify(log[key])}`;
    })
    return `${JSON.stringify(message)} ${keyValues.join(" ")}`
  }
}));

console.log = function(d) {
  logger.info(d);
};

console.log("my log");

