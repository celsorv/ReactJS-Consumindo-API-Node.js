import { getCustomRepository } from 'typeorm';
import MessagesRepository from '../repository/messages.repository';

const listMessageService = async () => {

    const messageRepository = getCustomRepository(MessagesRepository);

    const allMessages = await messageRepository.find();

    return allMessages;

}

export default listMessageService;