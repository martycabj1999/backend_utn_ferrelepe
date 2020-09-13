//Dependencias
import dotenv from 'dotenv';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import {
    logger
} from './src/modules/logger/logger';
import {
    PORT_BACKEND
} from './config';

const bodyParser = require('body-parser');
const app = express();
let server = http.createServer(app);
dotenv.config();

//Routes
import authRoutes from './src/modules/auth/routes';
import forumRoutes from './src/modules/forum/routes';
import careerRoutes from './src/modules/career/routes';

//Middlewares
import {
    jwtAuth,
    handleAuthError
} from './src/modules/auth/middleware/auth';
import rbacMiddleware from './src/modules/auth/middleware/rbacMiddleware';
import corsMiddleware from './src/modules/middleware/corsMiddleware';

const port = PORT_BACKEND;

//Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerAuth from './swagger/auth.json';
import swaggerForum from './swagger/forum.json';
import swaggerCareer from './swagger/career.json';

app.use('/api-auth', swaggerUi.serve, swaggerUi.setup(swaggerAuth));
app.use('/api-forum', swaggerUi.serve, swaggerUi.setup(swaggerForum));
app.use('/api-career', swaggerUi.serve, swaggerUi.setup(swaggerCareer));

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//CORS Middleware
app.use(corsMiddleware);

//Body Parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//AUTH Middleware
app.use(jwtAuth);
app.use(handleAuthError);

//RBAC Middleware
app.use(rbacMiddleware);

//Routes
app.use('/', authRoutes);
app.use('/', forumRoutes);
app.use('/', careerRoutes);


//It allows consuming the images saved in the Backend
app.use('/assets', express.static('assets'));
app.use('/upload', express.static('upload'));

//Socket.io
//IO = Is comunication for backend
/* module.exports.io = socketIO(server);
require('./sockets/socket'); */

app.get('/hello', (req, res) => {
    res.send("Hello")
});

server.listen(port, () => logger.info('Listening port: ' + port));