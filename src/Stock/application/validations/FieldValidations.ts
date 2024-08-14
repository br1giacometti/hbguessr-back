import { Injectable } from '@nestjs/common';
import Field from 'Stock/domain/models/Field';
import FieldNotFoundException from '../exception/FieldNotFoundException';

@Injectable()
export default class FieldValidations {
  validateExistingField(field: Field): boolean {
    if (field === null) {
      throw new FieldNotFoundException();
    }
    return true;
  }
}
