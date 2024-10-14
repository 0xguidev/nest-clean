import { Body, ConflictException, Controller, Post } from "@nestjs/common"
import { hash } from "bcryptjs"
import { PrismaServices } from "src/prisma/prisma.service"

@Controller("/accounts")
export class CreateAccountController {
  constructor(private prisma: PrismaServices) {}

  @Post()
  async handle(@Body() body: any) {
    const { name, email, password } = body

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

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
  }
}