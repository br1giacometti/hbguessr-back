import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import PrismaClient from 'Base/config/prisma/PrismaClient';

import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import GameRepository from 'Game/application/repository/GameRepository';
import Game from 'Game/domain/models/Game';
import GameEntity from '../entity/GameEntity';
import GameDescriptionAlreadyInUseException from 'Game/application/exception/MapDescriptionAlreadyInUseException';
import GameNotFoundException from 'Game/application/exception/GameNotFoundException';
import { connect } from 'http2';

@Injectable()
export default class GameDataProvider implements GameRepository {
  client: Prisma.GameDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(
    prisma: PrismaClient,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {
    this.client = prisma.game;
  }

  findGameByDescription: (description: string) => Promise<Game>;

  async insert(game: Game): Promise<Game> {
    console.log('Datos recibidos en insert:', game);
    try {
      const gameEntity = await this.client.create({
        data: {
          user: { connect: { id: '0c1cd7c5-f768-4b12-be1b-7bfacd91ae35' } },
          totalScore: 100,
          gameResults: {
            createMany: {
              data: {
                locationId: 1,
                selectedX: 270,
                selectedY: 120,
                mapId: 1,
                score: 0,
              },
            },
          },
        },
        include: {
          gameResults: true,
          user: true,
        },
      });

      return this.classMapper.mapAsync(gameEntity, GameEntity, Game);
    } catch (error) {
      console.error('Error inserting game:', error); // Log the error details
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new GameDescriptionAlreadyInUseException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unknown error');
    }
  }

  async findById(id: number): Promise<Game> {
    try {
      const gameEntity = await this.client.findUnique({
        where: { id },
        include: {
          user: true, // Incluye información del usuario
          gameResults: true, // Incluye todos los resultados del juego
        },
      });
      if (!gameEntity) {
        throw new GameNotFoundException();
      }
      return this.classMapper.mapAsync(gameEntity, GameEntity, Game);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new GameNotFoundException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }

  async findAll(): Promise<Game[]> {
    const games = await this.client.findMany({
      include: {
        gameResults: {
          include: {
            location: true,
            map: true,
          },
        },
        user: true,
      },
    });

    return this.classMapper.mapArrayAsync(games, GameEntity, Game);
  }

  async delete(id: number): Promise<Game> {
    const gameEntity = await this.client.delete({ where: { id } });

    return this.classMapper.mapAsync(gameEntity, GameEntity, Game);
  }

  async update(id: number, partialMap: Partial<Game>): Promise<Game> {
    try {
      const gameEntity = await this.client.update({
        where: { id },
        data: {
          totalScore: partialMap.totalScore, // Si deseas actualizar la puntuación total
          gameResults: {
            create:
              partialMap.gameResults?.map((result) => ({
                locationId: result.locationId,
                selectedX: result.selectedX,
                selectedY: result.selectedY,
                mapId: result.mapId,
                score: result.score,
                createdAt: result.createdAt ?? undefined, // Usa `undefined` si `createdAt` no se proporciona
              })) ?? [],
          },
        },
        include: {
          gameResults: true, // Incluye `gameResults` en el resultado
          user: true, // Incluye `user` en el resultado
        },
      });
      return this.classMapper.mapAsync(gameEntity, GameEntity, Game);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new GameNotFoundException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }
}
