export interface Alert {
  id: string;
  severity: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
}
