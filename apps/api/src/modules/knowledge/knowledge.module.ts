import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentChunkEntity } from './entities/document-chunk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentChunkEntity])],
  exports: [TypeOrmModule],
})
export class KnowledgeModule {}
