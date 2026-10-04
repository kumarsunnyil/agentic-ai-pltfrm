import { Injectable } from '@nestjs/common';

import type { Agent } from '../types/agent.types';

@Injectable()
export class AgentsRepository {
  getAgents(): Agent[] {
    return [
      {
        model: 'GPT-5',
        status: 'Online',
      },
      {
        model: 'Claude 4',
        status: 'Online',
      },
      {
        model: 'Gemini 2.5',
        status: 'Busy',
      },
      {
        model: 'DeepSeek',
        status: 'Offline',
      },
    ];
  }
}
