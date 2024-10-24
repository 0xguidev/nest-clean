import { PrismaServices } from '@/infra/http/databse/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import request from 'supertest'
import { AppModule } from '@/infra/app.module'

describe('fetch recent question (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaServices
  let jwt: JwtService

  beforeAll(async () => {
    const modularRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = modularRef.createNestApplication()
    prisma = modularRef.get(PrismaServices)
    jwt = modularRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'gui',
        email: 'gui@gui.com',
        password: '123123123123',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    await prisma.question.createMany({
      data: [
        {
          title: 'Question 01',
          content: 'Question content 01',
          slug: 'Question-content-01',
          authorId: user.id,
        },
        {
          title: 'Question 02',
          content: 'Question content 02',
          slug: 'Question-content-02',
          authorId: user.id,
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: 'Question 01' }),
        expect.objectContaining({ title: 'Question 02' }),
      ],
    })
  })
})
