import { Controller, Post, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { PrismaServices } from "src/prisma/prisma.service"

@Controller("/questions")
@UseGuards(AuthGuard("jwt"))
export class CreateQuestionController {
  constructor(private prisma: PrismaServices) {}

  @Post()
  async handle() {
    return "ok"
  }
}
