/**
 * ------------------------------------------------------------
 * @file: src\modules\workflows\types\workflow.types.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

export enum WorkflowStatus {
  Running = 'Running',
  Completed = 'Completed',
  Queued = 'Queued',
}

export interface Workflow {
  id: string;
  name: string;
  status: WorkflowStatus;
  progress: number;
}
