import { Module } from "@nestjs/common"
import { PrismaServices } from "./prisma/prisma.service"
import { CreateAccountController } from "./controllers/create-account.controller"

@Module({
  controllers: [CreateAccountController],
  providers: [PrismaServices],
})
export class AppModule {}
