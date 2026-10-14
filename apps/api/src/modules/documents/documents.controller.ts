/**
 * ------------------------------------------------------------
 * @file: src\modules\documents\documents.controller.ts
 * @description: Documents API controller.
 * @author: Sunil.S.Kumar
 * @date: 6-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import {
  BadRequestException,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'node:crypto';
import { extname, join, resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../auth/types/auth.types';
import type { AuthenticatedUser } from '../auth/types/auth.types';

import { DocumentsService } from './documents.service';
import type { Document } from './types/document.types';
import type { UploadedDocumentFile } from './types/document.types';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const MIME_TYPES: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.txt': 'text/plain',
};

const uploadDirectory = resolve(
  process.env.DOCUMENT_STORAGE_DIR || join(process.cwd(), 'storage', 'documents'),
);

const documentStorage = diskStorage({
  destination: (_request, _file, callback) => {
    void mkdir(uploadDirectory, { recursive: true })
      .then(() => callback(null, uploadDirectory))
      .catch((error: unknown) => {
        callback(
          error instanceof Error ? error : new Error('Unable to create document storage directory'),
          '',
        );
      });
  },

  filename: (_request, file, callback) => {
    const extension = extname(file.originalname).toLowerCase();
    callback(null, `${randomUUID()}${extension}`);
  },
});

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  /**
   * List documents.
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async getDocuments(): Promise<Document[]> {
    return this.documentsService.getDocuments();
  }

  /**
   * Upload a PDF, DOCX, or TXT document.
   */
  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SuperAdmin, UserRole.Admin, UserRole.Author)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: documentStorage,
      limits: {
        fileSize: MAX_FILE_SIZE,
        files: 1,
      },
      fileFilter: (_request, file, callback) => {
        const extension = extname(file.originalname).toLowerCase();
        const expectedMimeType = MIME_TYPES[extension];

        if (!expectedMimeType || file.mimetype !== expectedMimeType) {
          callback(
            new BadRequestException('Unsupported document type. Upload a PDF, DOCX, or TXT file.'),
            false,
          );
          return;
        }

        callback(null, true);
      },
    }),
  )
  async uploadDocument(
    @UploadedFile() file: UploadedDocumentFile | undefined,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<Document> {
    if (!file) {
      throw new BadRequestException('Choose a document to upload');
    }

    return this.documentsService.uploadDocument(file, user.id);
  }
}
