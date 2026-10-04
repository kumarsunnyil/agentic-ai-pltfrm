export type DocumentStatus = 'Indexed' | 'Processing';

export interface Document {
  id: string;
  title: string;
  type: string;
  time: string;
  status: DocumentStatus;
}
