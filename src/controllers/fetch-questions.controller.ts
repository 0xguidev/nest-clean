import { Controller, Get, Query, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/auth/jwt-auth.guard"
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe"
import { PrismaServices } from "src/prisma/prisma.service"
import { number, z } from "zod"

const pageQueryParamSchema = z
  .string()
  .optional()
  .default("1")
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class FetchRecentQuetionsController {
  constructor(private prisma: PrismaServices) {}

  @Get()
  async handle(@Query("page", queryValidationPipe) page: PageQueryParamSchema) {
    const perPage = 1

    const questions = await this.prisma.question.findMany({
      take: 1,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: "desc",
      },
    })

    return { questions }
  }
}