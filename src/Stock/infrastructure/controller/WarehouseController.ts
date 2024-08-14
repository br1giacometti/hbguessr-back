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
import WarehouseService from 'Stock/application/service/WarehouseService';
import { CreateWarehouseDto } from '../dto/Warehouse/CreateWarehouseDto';
import Warehouse from 'Stock/domain/models/Warehouse';
import { WarehouseDto } from '../dto/Warehouse/WarehouseDto';
import { UpdateWarehouseDto } from '../dto/Warehouse/UpdateWarehouseDto';

@Controller('warehouse')
export default class WarehouseController {
  constructor(
    private warehouseService: WarehouseService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(Warehouse, WarehouseDto, { isArray: true }))
  async getAllWharehouses(): Promise<WarehouseDto[]> {
    return this.warehouseService
      .fetchAllWarehouses()
      .then((warehouse) => warehouse);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(Warehouse, WarehouseDto))
  async getWarehouseById(
    @Param('id') warehouseId: string,
    @I18n() i18n: I18nContext,
  ): Promise<WarehouseDto> {
    return this.warehouseService
      .findWarehouseById(parseInt(warehouseId))
      .then((point) => point)
      .catch((error) => {
        switch (error.name) {
          case 'WarehouseNotFoundException': {
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
  @UseInterceptors(MapInterceptor(Warehouse, WarehouseDto))
  async login(@Body() warehouseDto: CreateWarehouseDto): Promise<WarehouseDto> {
    return this.warehouseService
      .createWarehouse(
        await this.mapper.mapAsync(warehouseDto, CreateWarehouseDto, Warehouse),
      )
      .then((warehouse) => warehouse)
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
  @UseInterceptors(MapInterceptor(Warehouse, WarehouseDto))
  async updateWarehouse(
    @Body() updateWarehouseDto: UpdateWarehouseDto,
    @Param('id') warehouseId: string,
    @I18n() i18n: I18nContext,
  ): Promise<WarehouseDto> {
    return this.warehouseService
      .updateWarehouse(
        parseInt(warehouseId),
        await this.mapper.mapAsync(
          updateWarehouseDto,
          UpdateWarehouseDto,
          Warehouse,
        ),
      )
      .then((warehouse) => warehouse)
      .catch((error) => {
        switch (error.name) {
          case 'WarehouseNotFoundException': {
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
  async deleteUser(@Param('id') warehouseId: number): Promise<boolean> {
    return this.warehouseService
      .deleteWarehouse(warehouseId)
      .then((warehouseDeleted) => !!warehouseDeleted)
      .catch((error) => {
        switch (error.name) {
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }
}
