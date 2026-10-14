import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDocumentStorageMetadata1792050000000 implements MigrationInterface {
  name = 'AddDocumentStorageMetadata1792050000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "documents"
        ADD COLUMN "originalName" character varying(255),
        ADD COLUMN "mimeType" character varying(127),
        ADD COLUMN "sizeBytes" integer,
        ADD COLUMN "storageKey" character varying(255),
        ADD COLUMN "uploadedBy" uuid
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "documents"
        DROP COLUMN "uploadedBy",
        DROP COLUMN "storageKey",
        DROP COLUMN "sizeBytes",
        DROP COLUMN "mimeType",
        DROP COLUMN "originalName"
    `);
  }
}
