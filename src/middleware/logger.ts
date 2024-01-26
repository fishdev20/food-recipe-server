import winston from 'winston';

const logFormat = winston.format.combine(
  winston.format.colorize({all: true}),  
  winston.format.label({label: '[LOGGER]'}),
  winston.format.timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
  winston.format.printf((info) => ` ${info.label} ${info.timestamp}  ${info.level} : ${info.message}`),
);

const logger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.Console({ format: logFormat}),
  ],
});

export default logger;