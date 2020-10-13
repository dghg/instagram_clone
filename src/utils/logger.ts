import * as winston from 'winston';
import * as winstondaily from 'winston-daily-rotate-file';
const { combine, printf, timestamp} = winston.format;
const logdir = '../logs'