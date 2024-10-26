import { Module } from '@nestjs/common'
import { PrismaServices } from './prisma/prisma.service'
import { PrismaAnswersCommentsRepository } from './prisma/repositories/prisma-answers-comments-repositories'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repositories'

import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repositories'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repositories'

@Module({
  exports: [
    PrismaServices,
    PrismaAnswersCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionsRepository,
    PrismaQuestionCommentsRepository,
  ],
  providers: [
    PrismaServices,
    PrismaAnswersCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionsRepository,
    PrismaQuestionCommentsRepository,
  ],
})
export class DatabaseModule {}
