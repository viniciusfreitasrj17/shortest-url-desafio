import {MigrationInterface, QueryRunner} from "typeorm";

export class UrlAddress1648969078653 implements MigrationInterface {
    name = 'UrlAddress1648969078653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`url_address\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`longUrl\` varchar(255) NOT NULL, \`shortUrl\` varchar(255) NOT NULL, \`urlCode\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`url_address\``);
    }

}
