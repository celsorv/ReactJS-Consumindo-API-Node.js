import { Column, Entity, PrimaryColumn, CreateDateColumn, Generated } from 'typeorm';

@Entity("messages")
class Message {

    @PrimaryColumn()
    @Generated('uuid')
    readonly id: string;

    @Column()
    email: string;

    @Column()
    message: string;

    @CreateDateColumn()
    created_at: Date;

}

export default Message;
