import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1693409419030 implements MigrationInterface {
    name = 'Migration1693409419030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "userid" TO "username"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_755ac9fbd440bc9b97fe9532108" TO "UQ_78a916df40e02a9deb1c4b75edb"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" TO "UQ_755ac9fbd440bc9b97fe9532108"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "username" TO "userid"`);
    }

}
