import { Controller, Post } from "@nestjs/common"
import { PrismaServices } from "src/prisma/prisma.service"

@Controller("/questions")
export class CreateQuestionController {
  constructor(private prisma: PrismaServices) {}

  @Post()
  async handle() {
    return "ok"
  }
}
