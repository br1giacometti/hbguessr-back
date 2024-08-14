import { Injectable } from '@nestjs/common';

import FieldRepository from '../repository/FieldRepository';
import FieldValidations from '../validations/FieldValidations';
import Field from 'Stock/domain/models/Field';

@Injectable()
export default class FieldService {
  constructor(
    private readonly repository: FieldRepository,
    private readonly validator: FieldValidations,
  ) {}

  async createField(field: Field): Promise<Field> {
    const fieldCreated = await this.repository.insert({
      description: field.description,
      id: field.id,
      hectares: field.hectares,
      batches: field.batches,
    });
    return fieldCreated;
  }

  async updateField(id: number, field: Field): Promise<Field> {
    const fieldCreated = await this.repository.update(id, {
      description: field.description,
    });
    return fieldCreated;
  }

  async deleteField(fieldId: number): Promise<Field> {
    return await this.repository.delete(fieldId);
  }

  async findFieldById(fieldId: number): Promise<Field> {
    const field = await this.repository.findById(fieldId);
    this.validator.validateExistingField(field);
    return field;
  }

  async fetchAllFields(): Promise<Field[]> {
    const field = await this.repository.findAll();
    return field;
  }
}
