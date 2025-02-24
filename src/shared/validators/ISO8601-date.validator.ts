import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import moment from 'moment';

@ValidatorConstraint({ name: 'customDate', async: false })
export class ISO8601DateValidator implements ValidatorConstraintInterface {
  validate(date: string, args: ValidationArguments) {
    return moment(date, moment.ISO_8601, true).isValid();
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid date format: ${args.value}. Must be a valid ISO 8601 date.`;
  }
}
