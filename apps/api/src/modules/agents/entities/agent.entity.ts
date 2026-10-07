import { Column, Entity, PrimaryColumn } from 'typeorm';

import type { AgentStatus } from '../types/agent.types';

@Entity('agents')
export class AgentEntity {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  model!: string;

  @Column({ type: 'varchar', length: 32 })
  status!: AgentStatus;
}
