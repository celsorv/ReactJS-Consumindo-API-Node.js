import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import deleteMessageService from "../../service/delete.message.service";

export const deleteMessageController = (req: Request, res: Response) => {

    const { id } = req.params;
    const newMessage = deleteMessageService(id);

    res.status(StatusCodes.NO_CONTENT).send();
}
