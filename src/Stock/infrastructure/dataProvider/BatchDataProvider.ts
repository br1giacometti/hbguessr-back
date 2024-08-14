import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import PrismaClient from 'Base/config/prisma/PrismaClient';

import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import BatchRepository from 'Stock/application/repository/BatchRepository';
import Batch from 'Stock/domain/models/Batch';
import BatchEntity from '../entity/BatchEntity';
import BatchDescriptionAlreadyInUseException from 'Stock/application/exception/BatchDescriptionAlreadyInUseException';
import BatchNotFoundException from 'Stock/application/exception/BatchNotFoundException';

@Injectable()
export default class BatchDataProvider implements BatchRepository {
  client: Prisma.BatchDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(
    prisma: PrismaClient,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {
    this.client = prisma.batch;
  }

  findBatchByDescription: (description: string) => Promise<Batch>;

  async insert(batch: Batch): Promise<Batch> {
    try {
      const batchEntity = await this.client.create({
        data: {
          description: batch.description,
          hectares: batch.hectares,
          fieldId: batch.fieldId,
        },
      });

      return this.classMapper.mapAsync(batchEntity, BatchEntity, Batch);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BatchDescriptionAlreadyInUseException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }

  async findById(id: number): Promise<Batch | null> {
    const batchEntity = await this.client.findUnique({
      where: { id },
      include: { field: true },
    });
    return this.classMapper.mapAsync(batchEntity, BatchEntity, Batch);
  }

  async findAll(): Promise<Batch[]> {
    const batches = await this.client.findMany();

    return this.classMapper.mapArrayAsync(batches, BatchEntity, Batch);
  }

  async delete(id: number): Promise<Batch> {
    const batchEntity = await this.client.delete({ where: { id } });

    return this.classMapper.mapAsync(batchEntity, BatchEntity, Batch);
  }

  async update(id: number, partialBatch: Partial<Batch>): Promise<Batch> {
    try {
      const batchEntity = await this.client.update({
        data: {
          description: partialBatch.description,
        },
        where: {
          id,
        },
      });
      return this.classMapper.mapAsync(batchEntity, BatchEntity, Batch);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BatchNotFoundException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }
}
