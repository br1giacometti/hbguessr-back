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

import { InjectMapper, MapInterceptor } from '@automapper/nestjs';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Mapper } from '@automapper/core';
import JwtAuthGuard from 'Authentication/infrastructure/guards/JwtAuthGuard';
import MapService from 'Game/application/service/MapService';
import Map from 'Game/domain/models/Map';
import { CreateMapDto } from '../dto/Map/CreateMapDto';
import { MapDto } from '../dto/Map/MapDto';
import { UpdateMapDto } from '../dto/Map/UpdateMapDto';

@Controller('map')
export default class MapController {
  constructor(
    private mapService: MapService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(Map, MapDto, { isArray: true }))
  async getAllMapss(): Promise<MapDto[]> {
    return this.mapService.fetchAllmaps().then((map) => map);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(Map, MapDto))
  async getMapById(
    @Param('id') mapId: string,
    @I18n() i18n: I18nContext,
  ): Promise<MapDto> {
    return this.mapService
      .findMapById(parseInt(mapId))
      .then((map) => map)
      .catch((error) => {
        switch (error.name) {
          case 'MapNotFoundException': {
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
  @UseInterceptors(MapInterceptor(Map, MapDto))
  async login(@Body() mapDto: CreateMapDto): Promise<MapDto> {
    return this.mapService
      .createMap(await this.mapper.mapAsync(mapDto, CreateMapDto, Map))
      .then((map) => map)
      .catch((error) => {
        switch (error.name) {
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(Map, MapDto))
  async updateMap(
    @Body() updateMapDto: UpdateMapDto,
    @Param('id') mapId: string,
    @I18n() i18n: I18nContext,
  ): Promise<MapDto> {
    return this.mapService
      .updateMap(
        parseInt(mapId),
        await this.mapper.mapAsync(updateMapDto, UpdateMapDto, Map),
      )
      .then((map) => map)
      .catch((error) => {
        switch (error.name) {
          case 'MapNotFoundException': {
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
  async deleteMap(@Param('id') mapId: number): Promise<boolean> {
    return this.mapService
      .deleteMap(mapId)
      .then((mapDeleted) => !!mapDeleted)
      .catch((error) => {
        switch (error.name) {
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }
}
