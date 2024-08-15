import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import PrismaClient from 'Base/config/prisma/PrismaClient';

import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import MapEntity from '../entity/MapEntity';
import MapRepository from 'Game/application/repository/MapRepository';
import Map from 'Game/domain/models/Map';
import MapDescriptionAlreadyInUseException from 'Game/application/exception/MapDescriptionAlreadyInUseException';
import MapNotFoundException from 'Game/application/exception/MapNotFoundException';

@Injectable()
export default class MapDataProvider implements MapRepository {
  client: Prisma.MapDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(
    prisma: PrismaClient,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {
    this.client = prisma.map;
  }

  findMapByDescription: (description: string) => Promise<Map>;

  async insert(map: Map): Promise<Map> {
    try {
      const mapEntity = await this.client.create({
        data: {
          name: map.name,
          imageUrl: map.imageUrl,
          sizeX: map.sizeX,
          sizeY: map.sizeY,
          ubication: map.ubication,
        },
      });

      return this.classMapper.mapAsync(mapEntity, MapEntity, Map);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new MapDescriptionAlreadyInUseException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }

  async findById(id: number): Promise<Map | null> {
    const mapEntity = await this.client.findUnique({
      where: { id },
      include: { locations: true },
    });
    return this.classMapper.mapAsync(mapEntity, MapEntity, Map);
  }
  async findAll(): Promise<Map[]> {
    // Obtiene los mapas, incluyendo la relación con las ubicaciones
    const mapes = await this.client.findMany({
      include: { locations: true },
      orderBy: {
        ubication: 'asc', // Ordena por 'ubication' de manera ascendente
      },
    });

    // Mapea los datos a la entidad Map
    return this.classMapper.mapArrayAsync(mapes, MapEntity, Map);
  }

  async delete(id: number): Promise<Map> {
    const mapEntity = await this.client.delete({ where: { id } });

    return this.classMapper.mapAsync(mapEntity, MapEntity, Map);
  }

  async update(id: number, partialMap: Partial<Map>): Promise<Map> {
    try {
      const mapEntity = await this.client.update({
        data: {
          name: partialMap.name,
          imageUrl: partialMap.imageUrl,
          sizeX: partialMap.sizeX,
          sizeY: partialMap.sizeY,
          ubication: partialMap.ubication,
        },
        where: {
          id,
        },
      });
      return this.classMapper.mapAsync(mapEntity, MapEntity, Map);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new MapNotFoundException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }
}
