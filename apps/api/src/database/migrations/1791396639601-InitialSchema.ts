import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1791396639601 implements MigrationInterface {
  name = 'InitialSchema1791396639601';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "activities" ("id" character varying(64) NOT NULL, "title" character varying(255) NOT NULL, "description" text NOT NULL, "type" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7f4004429f731ffb9c88eb486a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "agents" ("model" character varying(64) NOT NULL, "status" character varying(32) NOT NULL, CONSTRAINT "PK_30117b0ccef7d266ed6de3d67f8" PRIMARY KEY ("model"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "alerts" ("id" character varying(64) NOT NULL, "severity" character varying(16) NOT NULL, "title" character varying(255) NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_60f895662df096bfcdfab7f4b96" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ai_usage" ("usageDate" date NOT NULL, "requests" integer NOT NULL DEFAULT '0', "tokens" bigint NOT NULL DEFAULT '0', CONSTRAINT "PK_a82f83926b574164d705758761d" PRIMARY KEY ("usageDate"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "conversations" ("id" character varying(64) NOT NULL, "title" character varying(255) NOT NULL, "preview" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "documents" ("id" character varying(64) NOT NULL, "title" character varying(255) NOT NULL, "type" character varying(32) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "status" character varying(32) NOT NULL, CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."workflows_status_enum" AS ENUM('Running', 'Completed', 'Queued')`,
    );
    await queryRunner.query(
      `CREATE TABLE "workflows" ("id" character varying(64) NOT NULL, "name" character varying(255) NOT NULL, "status" "public"."workflows_status_enum" NOT NULL, "progress" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_5b5757cc1cd86268019fef52e0c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "workflows"`);
    await queryRunner.query(`DROP TYPE "public"."workflows_status_enum"`);
    await queryRunner.query(`DROP TABLE "documents"`);
    await queryRunner.query(`DROP TABLE "conversations"`);
    await queryRunner.query(`DROP TABLE "ai_usage"`);
    await queryRunner.query(`DROP TABLE "alerts"`);
    await queryRunner.query(`DROP TABLE "agents"`);
    await queryRunner.query(`DROP TABLE "activities"`);
  }
}
