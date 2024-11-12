import { PrismaServices } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import request from 'supertest'
import { AppModule } from '@/infra/app.module'

describe('get question by slug (E2E)', () => {
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

  test('[GET] /questions/:slug', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'gui',
        email: 'gui@gui.com',
        password: '123123123123',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    await prisma.question.create({
      data: {
        title: 'Question 01',
        content: 'Question content 01',
        slug: 'Question-content-01',
        authorId: user.id,
      },
    })

    const response = await request(app.getHttpServer())
      .get('/questions/Question-content-01')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      question: expect.objectContaining({ slug: 'Question-content-01' }),
    })
  })
})
