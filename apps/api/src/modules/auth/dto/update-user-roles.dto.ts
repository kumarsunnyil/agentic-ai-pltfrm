/**
 * ------------------------------------------------------------
 * @file: src\modules\auth\dto\update-user-roles.dto.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 10-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */
import { ArrayMinSize, ArrayUnique, IsArray, IsEnum } from 'class-validator';

import { UserRole } from '../types/auth.types';

export class UpdateUserRolesDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsEnum(UserRole, { each: true })
  roles!: UserRole[];
}
