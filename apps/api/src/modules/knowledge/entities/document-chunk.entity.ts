import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_chunks')
@Index('IDX_document_chunks_document', ['documentId'])
@Index('UQ_document_chunks_document_index', ['documentId', 'chunkIndex'], { unique: true })
export class DocumentChunkEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 64 })
  documentId!: string;

  @Column({ type: 'integer' })
  chunkIndex!: number;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'integer', nullable: true })
  pageNumber?: number | null;

  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" })
  metadata!: Record<string, unknown>;

  @Column('vector', { length: 384, nullable: true })
  embedding?: number[] | null;

  @Column({ type: 'varchar', length: 128, nullable: true })
  embeddingModel?: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
