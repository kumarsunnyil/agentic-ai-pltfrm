/**
 * ------------------------------------------------------------
 * @file: src\modules\auth\decorators\roles.decorator.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 08-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */
import { SetMetadata } from '@nestjs/common';

import { UserRole } from '../types/auth.types';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
