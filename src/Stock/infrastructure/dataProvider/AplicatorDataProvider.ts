import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import PrismaClient from 'Base/config/prisma/PrismaClient';

import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import AplicatorRepository from 'Stock/application/repository/AplicatorRepository';
import Aplicator from 'Stock/domain/models/Aplicator';
import AplicatorEntity from '../entity/AplicatorEntity';
import AplicatorNotFoundException from 'Stock/application/exception/AplicatorNotFoundException';

@Injectable()
export default class AplicatorDataProvider implements AplicatorRepository {
  client: Prisma.AplicatorDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(
    prisma: PrismaClient,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {
    this.client = prisma.aplicator;
  }

  findAplicatorByDescription: (description: string) => Promise<Aplicator>;

  async insert(aplicator: Aplicator): Promise<Aplicator> {
    try {
      const aplicatorEntity = await this.client.create({
        data: {
          description: aplicator.description,
        },
      });

      return this.classMapper.mapAsync(
        aplicatorEntity,
        AplicatorEntity,
        Aplicator,
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }

  async findById(id: number): Promise<Aplicator | null> {
    const aplicatorEntity = await this.client.findUnique({
      where: { id },
    });
    return this.classMapper.mapAsync(
      aplicatorEntity,
      AplicatorEntity,
      Aplicator,
    );
  }

  async findAll(): Promise<Aplicator[]> {
    const aplicatores = await this.client.findMany();

    return this.classMapper.mapArrayAsync(
      aplicatores,
      AplicatorEntity,
      Aplicator,
    );
  }

  async delete(id: number): Promise<Aplicator> {
    const aplicatorEntity = await this.client.delete({ where: { id } });

    return this.classMapper.mapAsync(
      aplicatorEntity,
      AplicatorEntity,
      Aplicator,
    );
  }

  async update(
    id: number,
    partialAplicator: Partial<Aplicator>,
  ): Promise<Aplicator> {
    try {
      const aplicatorEntity = await this.client.update({
        data: {
          description: partialAplicator.description,
        },
        where: {
          id,
        },
      });
      return this.classMapper.mapAsync(
        aplicatorEntity,
        AplicatorEntity,
        Aplicator,
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new AplicatorNotFoundException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }
}
