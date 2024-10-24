import { Module } from '@nestjs/common'
import { PrismaServices } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/auth.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuetionsController } from './controllers/fetch-questions.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuetionsController,
  ],
  providers: [PrismaServices],
})
export class AppModule {}
