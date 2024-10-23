import { AppModule } from '@/app.module'
import { PrismaServices } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create account (E2E)', () => {
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

  test('[POST] /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'gui',
      email: 'gui@gui.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'gui@gui.com',
      },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
