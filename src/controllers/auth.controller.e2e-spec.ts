import { AppModule } from '@/app.module'
import { PrismaServices } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Authenticate (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaServices

  beforeAll(async () => {
    const modularRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = modularRef.createNestApplication()
    prisma = modularRef.get(PrismaServices)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    await prisma.user.create({
      data: {
        name: 'gui',
        email: 'gui@gui.com',
        password: await hash('123456', 8),
      },
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'gui@gui.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
