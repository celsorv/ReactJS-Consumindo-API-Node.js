import { EntityRepository, Repository } from "typeorm";
import Message from "../entities/messages";

@EntityRepository(Message)
class MessagesRepository extends Repository<Message> {}

export default MessagesRepository;
