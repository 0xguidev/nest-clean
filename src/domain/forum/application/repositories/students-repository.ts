import { Question } from '@/domain/forum/enterprise/entities/question'
import { Student } from '../../enterprise/entities/student'

export abstract class StudentsRepository {
  abstract findByEmail(eamil: string): Promise<Student | null>
  abstract create(student: Question): Promise<void>
}
