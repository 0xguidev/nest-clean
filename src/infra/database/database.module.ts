import { Module } from '@nestjs/common'
import { PrismaServices } from './prisma/prisma.service'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repositories'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repositories'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repositories'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'
import { PrismaAnswersCommentsRepository } from './prisma/repositories/prisma-answers-comments-repositories'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answers-repositories'
import { PrismaAnswerAttachmentsReporitory } from './prisma/repositories/prisma-answer-attachments-repositories'

@Module({
  providers: [
    PrismaServices,
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswerRepository,
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsReporitory,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswersCommentsRepository,
    },
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
  ],
  exports: [
    PrismaServices,
    StudentsRepository,
    AnswersRepository,
    AnswerAttachmentsRepository,
    AnswerCommentsRepository,
    QuestionsRepository,
    QuestionAttachmentsRepository,
    QuestionCommentsRepository,
  ],
})
export class DatabaseModule {}
