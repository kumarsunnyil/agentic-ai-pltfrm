import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConversationsController } from './conversations.controller';
import { ConversationsSeed } from './conversations.seed';
import { ConversationEntity } from './entities/conversation.entity';
import { ConversationsRepository } from './repositories/conversations.repository';
import { ConversationsService } from './conversations.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConversationEntity])],
  controllers: [ConversationsController],
  providers: [ConversationsService, ConversationsRepository, ConversationsSeed],
  exports: [ConversationsService],
})
export class ConversationsModule {}
