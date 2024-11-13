import { Module } from '@nestjs/common'
import { PrismaServices } from './prisma/prisma.service'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repositories'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repositories'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repositories'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'
import { PrismaAnswersCommentsRepository } from './prisma/repositories/prisma-answers-comments-repositories'

@Module({
  providers: [
    PrismaServices,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    PrismaAnswersCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersCommentsRepository,
    PrismaStudentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionCommentsRepository,
  ],
  exports: [
    PrismaServices,
    StudentsRepository,
    PrismaStudentsRepository,
    PrismaAnswersCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaQuestionCommentsRepository,
    QuestionsRepository,
  ],
})
export class DatabaseModule {}
