import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsRepository } from './repositories/conversations.repository';
import { ConversationsService } from './conversations.service';

@Module({
  controllers: [ConversationsController],
  providers: [ConversationsRepository, ConversationsService],
  exports: [ConversationsService],
})
export class ConversationsModule {}
