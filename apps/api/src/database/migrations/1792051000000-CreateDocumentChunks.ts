import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDocumentChunks1792051000000 implements MigrationInterface {
  name = 'CreateDocumentChunks1792051000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "document_chunks" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "documentId" character varying(64) NOT NULL,
        "chunkIndex" integer NOT NULL,
        "content" text NOT NULL,
        "pageNumber" integer,
        "metadata" jsonb NOT NULL DEFAULT '{}'::jsonb,
        "embedding" vector(384),
        "embeddingModel" character varying(128),
        "createdAt" timestamptz NOT NULL DEFAULT now(),

        CONSTRAINT "FK_document_chunks_document"
          FOREIGN KEY ("documentId")
          REFERENCES "documents"("id")
          ON DELETE CASCADE,

        CONSTRAINT "UQ_document_chunks_document_index"
          UNIQUE ("documentId", "chunkIndex"),

        CONSTRAINT "CHK_document_chunks_chunk_index"
          CHECK ("chunkIndex" >= 0),

        CONSTRAINT "CHK_document_chunks_page_number"
          CHECK ("pageNumber" IS NULL OR "pageNumber" > 0)
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_document_chunks_document"
      ON "document_chunks" ("documentId")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_document_chunks_embedding_hnsw"
      ON "document_chunks"
      USING hnsw ("embedding" vector_cosine_ops)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_document_chunks_embedding_hnsw"
    `);

    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_document_chunks_document"
    `);

    await queryRunner.query(`
      DROP TABLE IF EXISTS "document_chunks"
    `);
  }
}
