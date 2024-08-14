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
import StockParametersService from 'Stock/application/service/StockParametersService';

import StockParameters from 'Stock/domain/models/StockParameters';
import { StockParametersDto } from '../dto/StockParameters/StockParametersDto';
import { UpdateStockParametersDto } from '../dto/StockParameters/UpdateStockParametersDto';
import { CreateStockParametersDto } from '../dto/StockParameters/CreateStockParametersDto';

@Controller('stock-parameters')
export default class StockParametersController {
  constructor(
    private StockParametersService: StockParametersService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    MapInterceptor(StockParameters, StockParametersDto, { isArray: true }),
  )
  async getAllStockParameterss(): Promise<StockParametersDto[]> {
    return this.StockParametersService.fetchAllStockParameterss().then(
      (StockParameters) => StockParameters,
    );
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(StockParameters, StockParametersDto))
  async getStockParametersById(
    @Param('id') StockParametersId: string,
    @I18n() i18n: I18nContext,
  ): Promise<StockParametersDto> {
    return this.StockParametersService.findStockParametersById(
      parseInt(StockParametersId),
    )
      .then((point) => point)
      .catch((error) => {
        switch (error.name) {
          case 'StockParametersNotFoundException': {
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
  @UseInterceptors(MapInterceptor(StockParameters, StockParametersDto))
  async login(
    @Body() StockParametersDto: CreateStockParametersDto,
    @I18n() i18n: I18nContext,
  ): Promise<StockParametersDto> {
    return this.StockParametersService.createStockParameters(
      await this.mapper.mapAsync(
        StockParametersDto,
        CreateStockParametersDto,
        StockParameters,
      ),
    )
      .then((StockParameters) => StockParameters)
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
  @UseInterceptors(MapInterceptor(StockParameters, StockParametersDto))
  async updateStockParameters(
    @Body() updateStockParametersDto: UpdateStockParametersDto,
    @Param('id') StockParametersId: string,
    @I18n() i18n: I18nContext,
  ): Promise<StockParametersDto> {
    return this.StockParametersService.updateStockParameters(
      parseInt(StockParametersId),
      await this.mapper.mapAsync(
        updateStockParametersDto,
        UpdateStockParametersDto,
        StockParameters,
      ),
    )
      .then((StockParameters) => StockParameters)
      .catch((error) => {
        switch (error.name) {
          case 'StockParametersNotFoundException': {
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
  async deleteStockParameters(
    @Param('id') StockParametersId: number,
  ): Promise<boolean> {
    return this.StockParametersService.deleteStockParameters(StockParametersId)
      .then((StockParametersDeleted) => !!StockParametersDeleted)
      .catch((error) => {
        switch (error.name) {
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }
}
