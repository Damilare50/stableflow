import { BadRequestException, ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class Helper {
  private static validationExceptionFactory = (errors: ValidationError[]) => {
    let err = [];
    errors.forEach((element) => {
      const x = Object.values(element.constraints).join(',');
      console.log(x);
      err.push(x);
    });

    throw new BadRequestException(err.join(','));
  };

  static getValidationPipeOptions = (): ValidationPipeOptions => ({
    enableDebugMessages: true,
    whitelist: true,
    exceptionFactory: Helper.validationExceptionFactory,
  });
}
