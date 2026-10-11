import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRoleAuditLogs1791634440000 implements MigrationInterface {
  name = 'CreateRoleAuditLogs1791634440000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "role_audit_logs" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "actorUserId" uuid NOT NULL,
        "targetUserId" uuid NOT NULL,
        "action" character varying(50) NOT NULL DEFAULT 'USER_ROLES_UPDATED',
        "targetEmail" character varying(255) NOT NULL,
        "previousRoles" character varying array NOT NULL,
        "newRoles" character varying array NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_role_audit_logs" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_role_audit_logs_actor_created"
      ON "role_audit_logs" ("actorUserId", "createdAt")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_role_audit_logs_target_created"
      ON "role_audit_logs" ("targetUserId", "createdAt")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "IDX_role_audit_logs_target_created"');

    await queryRunner.query('DROP INDEX "IDX_role_audit_logs_actor_created"');

    await queryRunner.query('DROP TABLE "role_audit_logs"');
  }
}
