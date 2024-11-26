import { PrismaServices } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import request from 'supertest'
import { AppModule } from '@/infra/app.module'
import { StudentFactory } from 'test/factories/make-student'
import { DatabaseModule } from '@/infra/database/database.module'
import { QuestionFactory } from 'test/factories/make-question'
import { QuestionCommentFactory } from 'test/factories/make-question-comment'

describe('Delete answer (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaServices
  let jwt: JwtService
  let questionFactory: QuestionFactory
  let studentFactory: StudentFactory
  let questionCommentFactory: QuestionCommentFactory

  beforeAll(async () => {
    const modularRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, QuestionCommentFactory],
    }).compile()

    app = modularRef.createNestApplication()
    prisma = modularRef.get(PrismaServices)
    jwt = modularRef.get(JwtService)
    questionFactory = modularRef.get(QuestionFactory)
    studentFactory = modularRef.get(StudentFactory)
    questionCommentFactory = modularRef.get(QuestionCommentFactory)

    await app.init()
  })

  test('[DELETE] /questions/comments/:id', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const questionComment = await questionCommentFactory.makeQuestionComment({
      authorId: user.id,
      questionId: question.id,
    })

    const questionCommentId = questionComment.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/questions/comments/${questionCommentId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(204)

    const commentOnDatabase = await prisma.comment.findUnique({
      where: {
        id: questionCommentId,
      },
    })

    expect(commentOnDatabase).toBeNull()
  })
})
