import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createMessageService from "../../service/create.message.service";

export const createMessageController = (req: Request, res: Response) => {

    const { email, message } = req.body;
    const newMessage = createMessageService({ email, message });

    res.status(StatusCodes.CREATED).send(newMessage);
}
