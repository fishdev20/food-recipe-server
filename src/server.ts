import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import logger from './middleware/logger';
import dotenv from 'dotenv';

dotenv.config();

const router = express();

/** Server Handling */
const httpServer = http.createServer(router);


/** Log the request */
router.use((req : Request, res: Response, next: NextFunction) => {
    logger.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logger.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req : Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes */
// router.use('/users', userRoutes);
// router.use('/blogs', blogRoutes);

/** Error handling */
router.use((req : Request, res: Response, next: NextFunction) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

/** Listen */
httpServer.listen(process.env.PORT, () => logger.info(`Server is running ${process.env.HOST}:${process.env.PORT}`));