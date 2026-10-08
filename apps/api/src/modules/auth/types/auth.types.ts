/**
 * ------------------------------------------------------------
 * @file: src\modules\auth\types\auth.types.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 08-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

export enum UserRole {
  SuperAdmin = 'SUPER_ADMIN',
  Admin = 'ADMIN',
  Author = 'AUTHOR',
  Reader = 'READER',
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  roles: UserRole[];
}
