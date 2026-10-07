import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('conversations')
export class ConversationEntity {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text' })
  preview!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
