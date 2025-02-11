import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateIsActiveToUser1739301927363 implements MigrationInterface {
    name = 'UpdateIsActiveToUser1739301927363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "twoFactorSecret"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "twoFactorSecret" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "twoFactorSecret"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "twoFactorSecret" jsonb`);
    }

}
