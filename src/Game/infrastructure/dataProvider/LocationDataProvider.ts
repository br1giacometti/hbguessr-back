import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import PrismaClient from 'Base/config/prisma/PrismaClient';

import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import LocationRepository from 'Game/application/repository/LocationRepository';
import Location from 'Game/domain/models/Location';
import LocationEntity from '../entity/LocationEntity';
import LocationDescriptionAlreadyInUseException from 'Game/application/exception/MapDescriptionAlreadyInUseException';
import LocationNotFoundException from 'Game/application/exception/LocationNotFoundException';
import { connect } from 'http2';

@Injectable()
export default class LocationDataProvider implements LocationRepository {
  client: Prisma.LocationDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(
    prisma: PrismaClient,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {
    this.client = prisma.location;
  }

  findLocationByDescription: (description: string) => Promise<Location>;

  async insert(location: Location): Promise<Location> {
    try {
      const locationEntity = await this.client.create({
        data: {
          imageUrl: location.imageUrl,
          coordX: location.coordX,
          coordY: location.coordY,
          map: { connect: { id: location.mapId } },
        },
      });

      return this.classMapper.mapAsync(
        locationEntity,
        LocationEntity,
        Location,
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new LocationDescriptionAlreadyInUseException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }

  async findById(id: number): Promise<Location | null> {
    const locationEntity = await this.client.findUnique({
      where: { id },
    });
    return this.classMapper.mapAsync(locationEntity, LocationEntity, Location);
  }

  async findAll(): Promise<Location[]> {
    const locations = await this.client.findMany();

    return this.classMapper.mapArrayAsync(locations, LocationEntity, Location);
  }

  async delete(id: number): Promise<Location> {
    const locationEntity = await this.client.delete({ where: { id } });

    return this.classMapper.mapAsync(locationEntity, LocationEntity, Location);
  }

  async update(id: number, partialMap: Partial<Location>): Promise<Location> {
    try {
      const locationEntity = await this.client.update({
        data: {
          imageUrl: partialMap.imageUrl,
        },
        where: {
          id,
        },
      });
      return this.classMapper.mapAsync(
        locationEntity,
        LocationEntity,
        Location,
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new LocationNotFoundException();
        }
        throw new Error(error.message);
      }
      throw new Error('Unkwown error');
    }
  }
}
