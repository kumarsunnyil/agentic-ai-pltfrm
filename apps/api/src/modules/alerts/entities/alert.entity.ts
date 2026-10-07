import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

import type { Alert } from '../types/alert.types';

@Entity('alerts')
export class AlertEntity {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id!: string;

  @Column({ type: 'varchar', length: 16 })
  severity!: Alert['severity'];

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
