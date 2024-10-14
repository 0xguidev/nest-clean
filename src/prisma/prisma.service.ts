import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
@Injectable()
export class PrismaServices
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
  public client: PrismaClient

  constructor() {
    super({
      log: ["warn", "error"],
    })
  }
  onModuleDestroy() {
    return this.$connect()
  }
  onModuleInit() {
    return this.$disconnect()
  }
}
