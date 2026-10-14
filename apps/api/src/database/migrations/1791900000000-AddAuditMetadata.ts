import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAuditMetadata1791900000000 implements MigrationInterface {
  name = 'AddAuditMetadata1791900000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "role_audit_logs"
      ADD COLUMN "metadata" jsonb
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "role_audit_logs"
      DROP COLUMN "metadata"
    `);
  }
}
