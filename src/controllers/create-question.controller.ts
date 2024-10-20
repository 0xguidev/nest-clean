import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from '@/auth/current-user.decorator'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { UserPayload } from '@/auth/jwt-strategy'
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'
import { PrismaServices } from '@/prisma/prisma.service'
import { z } from 'zod'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaServices) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(new ZodValidationPipe(createQuestionBodySchema))
    body: CreateQuestionBodySchema,
  ) {
    const { title, content } = body
    const { sub: userId } = user

    const slug = this.convertToSlug(title)

    const question = await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug,
      },
    })

    return question
  }

  private convertToSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }
}
