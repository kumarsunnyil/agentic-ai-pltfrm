import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAuditActorDetails1791990000000 implements MigrationInterface {
  name = 'AddAuditActorDetails1791990000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "role_audit_logs"
      ADD COLUMN "actorEmail" character varying(255),
      ADD COLUMN "actorName" character varying(201)
    `);

    // Backfill historical entries from the existing users table.
    await queryRunner.query(`
      UPDATE "role_audit_logs" AS audit
      SET
        "actorEmail" = actor."email",
        "actorName" = NULLIF(
          TRIM(CONCAT(actor."firstName", ' ', actor."lastName")),
          ''
        )
      FROM "users" AS actor
      WHERE actor."id" = audit."actorUserId"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "role_audit_logs"
      DROP COLUMN "actorName",
      DROP COLUMN "actorEmail"
    `);
  }
}
