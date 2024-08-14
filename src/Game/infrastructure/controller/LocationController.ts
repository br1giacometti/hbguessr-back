import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { I18n, I18nContext } from 'nestjs-i18n';

import JwtAuthGuard from 'Authentication/infrastructure/guards/JwtAuthGuard';

import Location from 'Game/domain/models/Location';
import { LocationDto } from '../dto/Location/LocationDto';
import { CreateLocationDto } from '../dto/Location/CreateLocationDto';
import { UpdateLocationDto } from '../dto/Location/UpdateLocationDto';
import LocationService from 'Game/application/service/LocationService';
import { InjectMapper, MapInterceptor } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Controller('Location')
export default class LocationController {
  constructor(
    private LocationService: LocationService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(Location, LocationDto, { isArray: true }))
  async getAllLocations(): Promise<LocationDto[]> {
    return this.LocationService.fetchAlllocations().then(
      (Location) => Location,
    );
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(Location, LocationDto))
  async getLocationById(
    @Param('id') LocationId: string,
    @I18n() i18n: I18nContext,
  ): Promise<LocationDto> {
    return this.LocationService.findLocationById(parseInt(LocationId))
      .then((point) => point)
      .catch((error) => {
        switch (error.name) {
          case 'LocationNotFoundException': {
            throw new HttpException(i18n.t(error.message), 404);
          }
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(Location, LocationDto))
  async login(
    @Body() LocationDto: CreateLocationDto,
    @I18n() i18n: I18nContext,
  ): Promise<LocationDto> {
    return this.LocationService.createLocation(
      await this.mapper.mapAsync(LocationDto, CreateLocationDto, Location),
    )
      .then((Location) => Location)
      .catch((error) => {
        switch (error.name) {
          case 'FieldNotFoundException': {
            throw new HttpException(i18n.t(error.message), 404);
          }
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(Location, LocationDto))
  async updateLocation(
    @Body() updateLocationDto: UpdateLocationDto,
    @Param('id') LocationId: string,
    @I18n() i18n: I18nContext,
  ): Promise<LocationDto> {
    return this.LocationService.updateLocation(
      parseInt(LocationId),
      await this.mapper.mapAsync(
        updateLocationDto,
        UpdateLocationDto,
        Location,
      ),
    )
      .then((Location) => Location)
      .catch((error) => {
        switch (error.name) {
          case 'LocationNotFoundException': {
            throw new HttpException(i18n.t(error.message), 404);
          }
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteLocation(@Param('id') LocationId: number): Promise<boolean> {
    return this.LocationService.deleteLocation(LocationId)
      .then((LocationDeleted) => !!LocationDeleted)
      .catch((error) => {
        switch (error.name) {
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }
}
