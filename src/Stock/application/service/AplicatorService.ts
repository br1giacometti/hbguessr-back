import { Injectable } from '@nestjs/common';

import AplicatorRepository from '../repository/AplicatorRepository';
import Aplicator from 'Stock/domain/models/Aplicator';
import AplicatorValidations from '../validations/AplicatorValidations';

@Injectable()
export default class AplicatorService {
  constructor(
    private readonly repository: AplicatorRepository,
    private readonly validator: AplicatorValidations,
  ) {}

  async createAplicator(aplicator: Aplicator): Promise<Aplicator> {
    const aplicatorCreated = await this.repository.insert({
      description: aplicator.description,
      id: aplicator.id,
    });
    return aplicatorCreated;
  }

  async updateAplicator(id: number, aplicator: Aplicator): Promise<Aplicator> {
    const aplicatorCreated = await this.repository.update(id, {
      description: aplicator.description,
    });
    return aplicatorCreated;
  }

  async deleteAplicator(aplicatorId: number): Promise<Aplicator> {
    return await this.repository.delete(aplicatorId);
  }

  async findAplicatorById(aplicatorId: number): Promise<Aplicator> {
    this.validator.validateAplicatorId(aplicatorId);
    const aplicator = await this.repository.findById(aplicatorId);
    console.log('tor', aplicator);
    this.validator.validateExistingAplicator(aplicator);
    return aplicator;
  }

  async fetchAllaplicators(): Promise<Aplicator[]> {
    const aplicator = await this.repository.findAll();
    return aplicator;
  }
}
