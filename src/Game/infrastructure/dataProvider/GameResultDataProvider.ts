import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import PrismaClient from 'Base/config/prisma/PrismaClient';

import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import GameResultEntity from '../entity/GameResultEntity';

import { connect } from 'http2';
import GameResultRepository from 'Game/application/repository/GameResultRepository';
import GameResult from 'Game/domain/models/GameResult';
import GameResultDescriptionAlreadyInUseException from 'Game/application/exception/GameResultDescriptionAlreadyInUseException';
import GameResultNotFoundException from 'Game/application/exception/GameResultNotFoundException';

@Injectable()
export default class GameResultDataProvider implements GameResultRepository {
  client: Prisma.GameResultDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(
    prisma: PrismaClient,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {
    this.client = prisma.gameResult;
  }

  findGameResultByDescription: (description: string) => Promise<GameResult>;

  async insert(gameResult: GameResult): Promise<GameResult> {
    try {
      const gameresultEntity = await this.client.create({
        data: {
          game: {
            connect: { id: gameResult.gameId }, // Conectar con la ubicación correspondiente
          },
          location: {
            connect: { id: gameResult.locationId }, // Conectar con la ubicación correspondiente
          },
          selectedX: gameResult.selectedX,
          selectedY: gameResult.selectedY,
          map: {
            connect: { id: gameResult.mapId }, // Conectar con el mapa correspondiente
          },
          score: gameResult.score,
          createdAt: gameResult.createdAt ?? undefined, // Usa `undefined` si `createdAt` no se proporciona
        },
      });

      return this.classMapper.mapAsync(
        gameresultEntity,
        GameResultEntity,
        GameResult,
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new GameResultDescriptionAlreadyInUseException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }

  async findById(id: number): Promise<GameResult | null> {
    const gameresultEntity = await this.client.findUnique({
      where: { id },
    });
    return this.classMapper.mapAsync(
      gameresultEntity,
      GameResultEntity,
      GameResult,
    );
  }

  async findAll(): Promise<GameResult[]> {
    const gameresults = await this.client.findMany({
      include: { location: true, map: true },
    });

    return this.classMapper.mapArrayAsync(
      gameresults,
      GameResultEntity,
      GameResult,
    );
  }

  async delete(id: number): Promise<GameResult> {
    const gameresultEntity = await this.client.delete({ where: { id } });

    return this.classMapper.mapAsync(
      gameresultEntity,
      GameResultEntity,
      GameResult,
    );
  }

  async update(
    id: number,
    partialMap: Partial<GameResult>,
  ): Promise<GameResult> {
    try {
      const gameresultEntity = await this.client.update({
        data: {},
        where: {
          id,
        },
      });
      return this.classMapper.mapAsync(
        gameresultEntity,
        GameResultEntity,
        GameResult,
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new GameResultNotFoundException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }
}
