import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaServices } from '../prisma.service'
import { PrismaAnswerAttachmentMapper } from '../mappers/primsa-answer-attachment-mapper'

@Injectable()
export class PrismaAnwerAttachmentsReporitory
  implements AnswerAttachmentsRepository
{
  constructor(private prisma: PrismaServices) {}

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const questionAttachments = await this.prisma.attachment.findMany({
      where: { answerId },
    })

    return questionAttachments.map(PrismaAnswerAttachmentMapper.toDomain)
  }
  async deleteManyByAnswerId(answerId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        answerId,
      },
    })
  }
}
