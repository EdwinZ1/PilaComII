/* eslint-disable prettier/prettier */
// Importando a winston
import winston, { format, transport } from 'winston';
import appRoot from 'app-root-path';
// Componenetes para crear el formato personalizado
const { conbine, timestamp,json,colorize,uncolorize, printf } = format;
//
// Perfil de color para el log
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'green',
};
// Agregando el perfil de winston
winston.addColors(colors);


// Formato de consola
const myFormat = conbine (
    colorize({all: true}),
    timestamp(),
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);
// Formato para los archivos de Log
const myFileFormat = conbine (
    uncolorize(),
    timestamp(),
    json()
);
// Creando objetos de configuracion
const options = {
    infoFile: {
        level: 'info',
        filename: `${appRoot}/server/logs/infos.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5 megas
        maxFiles: 5,
        format: myFileFormat,
    },
    warnFile: {
        level: 'warn',
        filename: `${appRoot}/server/logs/warns.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5 megas
        maxFiles: 5,
        format: myFileFormat,
    },
    errorFile: {
        level: 'error',
        filename: `${appRoot}/server/logs/erros.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5 megas
        maxFiles: 5,
        format: myFileFormat,
    },
    levelFile: {
        level: 'debug',
        handleExceptions: true,
        format: myFormat,
    },
};

// Creando la isntancia ddel logger
const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.infoFile),
        new winston.transports.File(options.warnFile),
        new winston.transports.File(options.errorFile),
        new winston.transports.File(options.console),
    ],
    exitOnError: false, // No finaliza en Excepciones Manejadas

});

// Manejo de un Stream de entrada
logger.stream = {
    write(message) {
        logger.info(message);
    },
};
export default logger;
