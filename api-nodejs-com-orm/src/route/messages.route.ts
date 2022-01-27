import { Router } from 'express';
import { listMessageController, createMessageController, deleteMessageController } from '../controller/messages';

const messagesRoute = Router();

messagesRoute.get('/message', listMessageController)
messagesRoute.post('/message', createMessageController);
messagesRoute.delete('/message/:id', deleteMessageController);

export default messagesRoute;
