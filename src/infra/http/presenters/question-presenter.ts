import { Question } from '@/domain/forum/enterprise/entities/question'
import { title } from 'process'

export class QuestionPresenter {
  static toHttp(question: Question) {
    return {
      id: question.id.toString(),
      title: question.title,
      content: question.content,
      slug: question.slug.value,
      bestAnserId: question.bestAnswerId?.toString(),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
