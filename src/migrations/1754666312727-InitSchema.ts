import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1754666312727 implements MigrationInterface {
    name = 'InitSchema1754666312727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "reservations_guest_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "reservations_room_id_fkey"`);
        await queryRunner.query(`DROP INDEX "public"."idx_reservations_room_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_reservations_guest_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_reservations_period"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "passwordHash" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "twoFactorEnabled" boolean NOT NULL DEFAULT false, "twoFactorSecret" character varying(255), "passwordResetCode" character varying(6), "passwordResetExpiresAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "pricepernight"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "createdat"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "updatedat"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "numberofguests"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "checkin"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "checkout"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "createdat"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "updatedat"`);
        await queryRunner.query(`ALTER TABLE "guests" DROP COLUMN "createdat"`);
        await queryRunner.query(`ALTER TABLE "guests" DROP COLUMN "updatedat"`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD "pricePerNight" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "numberOfGuests" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "checkIn" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "checkOut" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "guests" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "guests" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "reservations" ALTER COLUMN "guest_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservations" ALTER COLUMN "room_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_dc005326311e08f043613095b3e" FOREIGN KEY ("guest_id") REFERENCES "guests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_6aef3a04f7c96611e75d2db10fb" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_6aef3a04f7c96611e75d2db10fb"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_dc005326311e08f043613095b3e"`);
        await queryRunner.query(`ALTER TABLE "reservations" ALTER COLUMN "room_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservations" ALTER COLUMN "guest_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "guests" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "guests" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "checkOut"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "checkIn"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "numberOfGuests"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "pricePerNight"`);
        await queryRunner.query(`ALTER TABLE "guests" ADD "updatedat" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "guests" ADD "createdat" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "updatedat" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "createdat" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "checkout" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "checkin" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "numberofguests" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD "updatedat" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD "createdat" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD "pricepernight" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`CREATE INDEX "idx_reservations_period" ON "reservations" ("checkin", "checkout") `);
        await queryRunner.query(`CREATE INDEX "idx_reservations_guest_id" ON "reservations" ("guest_id") `);
        await queryRunner.query(`CREATE INDEX "idx_reservations_room_id" ON "reservations" ("room_id") `);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "reservations_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "reservations_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "guests"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

}
