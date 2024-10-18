import { PipeTransform, BadRequestException } from "@nestjs/common"
import { ZodError, ZodSchema } from "zod"
import { fromZodError, ValidationError } from "zod-validation-error"

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: "validation fail",
          statusCode: 400,
          error: fromZodError(error),
        })
      }
      throw new BadRequestException("Validation failed")
    }
  }
}
