import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidAttachmentType extends Error implements UseCaseError {
  constructor(typep: string) {
    super(`File type "${typep}" is not valid`)
  }
}
