import { getCustomRepository } from 'typeorm';
import MessagesRepository from '../repository/messages.repository';

interface IMessage {
    email: string,
    message: string
}

const createMessageService = async ({ email, message }:IMessage) => {

    const messageRepository = getCustomRepository(MessagesRepository);

    const newMessage = messageRepository.create({ email, message });

    await messageRepository.save(newMessage);

    /*
    const newMessage = await getRepository(Message)
        .createQueryBuilder().insert().into(Message)
        .values([{ email: email, message: message }]).execute();
    */

    return newMessage;

}

export default createMessageService;