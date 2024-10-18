import { Controller, Post, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/auth/jwt-auth.guard"
import { PrismaServices } from "src/prisma/prisma.service"

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaServices) {}

  @Post()
  async handle() {
    return "ok"
  }
}
