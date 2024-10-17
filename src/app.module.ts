import { Module } from "@nestjs/common"
import { PrismaServices } from "./prisma/prisma.service"
import { CreateAccountController } from "./controllers/create-account.controller"
import { ConfigModule } from "@nestjs/config"
import { envSchema } from "./env"
import { AuthModule } from "./auth/auth.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule
  ],
  controllers: [CreateAccountController],
  providers: [PrismaServices],
})
export class AppModule {}
