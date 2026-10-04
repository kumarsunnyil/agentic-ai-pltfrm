export interface Workflows {
  id: string;
  name: string;
  status: 'Running' | 'Completed' | 'Queued';
  progress: number;
}
