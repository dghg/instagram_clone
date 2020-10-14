import * as winston from 'winston';
import 'winston-daily-rotate-file';
const { combine, printf, timestamp} = winston.format;
const { DailyRotateFile } = winston.transports;
const logdir = 'logs'

interface LoggerInfo {
    level: string;
    message: string;
}

const logForm = printf((info: LoggerInfo) => {
  return `${info.level} ${info.message}`;
});

const logger = winston.createLogger({
    format: combine(
		timestamp({
			format : 'YYYY-MM-DD HH:mm:ss',
		}),
        logForm,),
    transports: [		
        new DailyRotateFile({
        level : 'info',
        datePattern : 'YYYY-MM-DD',
        dirname: logdir,
        filename : `%DATE%.log`,
        maxFiles : 30,
        zippedArchive : true,
    }),
        new DailyRotateFile({
        level : 'error',
        datePattern : 'YYYY-MM-DD',
        dirname: logdir + '/error',
        filename : `%DATE%.error.log`,
        maxFiles : 30,
        zippedArchive : true,
    }),

    ],
});

// Production 환경이 아닌 경우(dev 등) 
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),  // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
      )
    }));
  }
  
export default logger;