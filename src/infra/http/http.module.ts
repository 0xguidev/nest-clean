import { Module } from '@nestjs/common'
import { AuthenticateController } from './controllers/auth.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuetionsController } from './controllers/fetch-questions.controller'
import { PrismaServices } from '../database/prisma/prisma.service'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuetionsController,
  ],
})
export class HttpModule {}
