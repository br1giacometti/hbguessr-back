import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import PrismaClient from 'Base/config/prisma/PrismaClient';

import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import FieldRepository from 'Stock/application/repository/FieldRepository';
import Field from 'Stock/domain/models/Field';
import FieldEntity from '../entity/FieldEntity';
import FieldDescriptionAlreadyInUseException from 'Stock/application/exception/FieldDescriptionAlreadyInUseException';
import FieldNotFoundException from 'Stock/application/exception/FieldNotFoundException';

@Injectable()
export default class FieldDataProvider implements FieldRepository {
  client: Prisma.FieldDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(
    prisma: PrismaClient,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {
    this.client = prisma.field;
  }

  findFieldByDescription: (description: string) => Promise<Field>;

  async insert(field: Field): Promise<Field> {
    try {
      const fieldEntity = await this.client.create({
        data: {
          description: field.description,
          hectares: field.hectares,
          batches: {
            createMany: {
              data: field.batches,
            },
          },
        },
        include: {
          batches: true,
        },
      });

      return this.classMapper.mapAsync(fieldEntity, FieldEntity, Field);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new FieldDescriptionAlreadyInUseException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }

  async findById(id: number): Promise<Field | null> {
    const fieldEntity = await this.client.findUnique({
      where: { id },
      include: {
        batches: true,
      },
    });
    return this.classMapper.mapAsync(fieldEntity, FieldEntity, Field);
  }

  async findAll(): Promise<Field[]> {
    const fieldes = await this.client.findMany({
      include: {
        batches: true,
      },
    });

    return this.classMapper.mapArrayAsync(fieldes, FieldEntity, Field);
  }

  async delete(id: number): Promise<Field> {
    const fieldEntity = await this.client.delete({ where: { id } });

    return this.classMapper.mapAsync(fieldEntity, FieldEntity, Field);
  }

  async update(id: number, partialField: Partial<Field>): Promise<Field> {
    try {
      const fieldEntity = await this.client.update({
        data: {
          description: partialField.description,
        },
        where: {
          id,
        },
      });
      return this.classMapper.mapAsync(fieldEntity, FieldEntity, Field);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new FieldNotFoundException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }
}
