import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import listMessageService from '../../service/list.message.service';

export const listMessageController = async (req: Request, res: Response) => {

    const allMessages = await listMessageService();
    res.status(StatusCodes.OK).send(allMessages)

}
