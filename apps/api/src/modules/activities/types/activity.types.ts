/**
 * ------------------------------------------------------------
 * @file: src\modules\activities\types\activity.types.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

export type ActivityType = 'agent' | 'document' | 'workflow';

export interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  type: ActivityType;
}
