export interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'agent' | 'document' | 'workflow';
}
