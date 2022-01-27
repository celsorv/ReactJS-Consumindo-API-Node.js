import { getCustomRepository } from 'typeorm';
import MessagesRepository from '../repository/messages.repository';

const createMessageService = async (id: string) => {

    const messageRepository = getCustomRepository(MessagesRepository);

    await messageRepository.delete(id)

    /*
    await getRepository(Message)
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id: id })
            .execute();
    */

}

export default createMessageService;