export type AgentStatus = 'Online' | 'Busy' | 'Offline';

export interface Agent {
  model: string;
  status: AgentStatus;
}
