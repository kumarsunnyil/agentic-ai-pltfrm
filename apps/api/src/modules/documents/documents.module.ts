import { Module } from '@nestjs/common';

import { DocumentsController } from './documents.controller';
import { DocumentsRepository } from './repositories/documents.repository';
import { DocumentsService } from './documents.service';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentsRepository],
  exports: [DocumentsService],
})
export class DocumentsModule {}
