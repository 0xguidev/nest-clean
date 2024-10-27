import { Module } from '@nestjs/common'
import { PrismaServices } from './prisma/prisma.service'
import { PrismaAnswersCommentsRepository } from './prisma/repositories/prisma-answers-comments-repositories'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repositories'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repositories'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repositories'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'

@Module({
  providers: [
    PrismaServices,
    PrismaAnswersCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    PrismaQuestionCommentsRepository,
  ],
  exports: [
    PrismaServices,
    PrismaAnswersCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionCommentsRepository,
    QuestionsRepository,
  ],
})
export class DatabaseModule {}
