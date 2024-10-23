import { Module } from '@nestjs/common'
import { AuthenticateController } from './controllers/auth.controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateQuestionController } from './controllers/create-question.controller';
import { FetchRecentQuetionsController } from './controllers/fetch-questions.controller';
import { PrismaServices } from '../prisma/prisma.service';

@Module({
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuetionsController,
  ],

  providers: [PrismaServices],
})
export class HttpModule {}
