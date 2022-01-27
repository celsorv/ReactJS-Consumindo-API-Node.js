import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateMessages1642937932475 implements MigrationInterface {

    // acionado quando executar essa migration
    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: 'messages',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'message',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ]
            })
        )

    }

    // adicionado quando executar um reverse (reverter essa migration)
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('messages');
    }

}
