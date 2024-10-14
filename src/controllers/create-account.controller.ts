import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from "@nestjs/common"
import { hash } from "bcryptjs"
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe"
import { PrismaServices } from "src/prisma/prisma.service"
import { z } from "zod"

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller("/accounts")
export class CreateAccountController {
  constructor(private prisma: PrismaServices) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async createUser(@Body() body: CreateAccountBodySchema) {
    const { email, password, name } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException(
        "User with smae e-mail address already exists.",
      )
    }

    const hashedPassword = await hash(password, 8)

    const createdUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return {
      statusCode: 201,
      user: createdUser,
    }
  }
}
