import express from 'express';
import createConnection from './database';
import messagesRoute from './route/messages.route';

createConnection();
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(messagesRoute);

server.listen(8000, () => {
    console.log('Servidor ativo na porta 8000')
});

