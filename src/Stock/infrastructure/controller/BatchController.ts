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
import BatchService from 'Stock/application/service/BatchService';
import { CreateBatchDto } from '../dto/Batch/CreateFieldDto';
import Batch from 'Stock/domain/models/Batch';
import { BatchDto } from '../dto/Batch/BatchDto';
import { UpdateBatchDto } from '../dto/Batch/UpdateBatchDto';

@Controller('batch')
export default class BatchController {
  constructor(
    private batchService: BatchService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(Batch, BatchDto, { isArray: true }))
  async getAllBatchs(): Promise<BatchDto[]> {
    return this.batchService.fetchAllbatchs().then((batch) => batch);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(Batch, BatchDto))
  async getBatchById(
    @Param('id') batchId: string,
    @I18n() i18n: I18nContext,
  ): Promise<BatchDto> {
    return this.batchService
      .findBatchById(parseInt(batchId))
      .then((point) => point)
      .catch((error) => {
        switch (error.name) {
          case 'BatchNotFoundException': {
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
  @UseInterceptors(MapInterceptor(Batch, BatchDto))
  async login(
    @Body() batchDto: CreateBatchDto,
    @I18n() i18n: I18nContext,
  ): Promise<BatchDto> {
    return this.batchService
      .createBatch(await this.mapper.mapAsync(batchDto, CreateBatchDto, Batch))
      .then((batch) => batch)
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
  @UseInterceptors(MapInterceptor(Batch, BatchDto))
  async updateBatch(
    @Body() updateBatchDto: UpdateBatchDto,
    @Param('id') batchId: string,
    @I18n() i18n: I18nContext,
  ): Promise<BatchDto> {
    return this.batchService
      .updateBatch(
        parseInt(batchId),
        await this.mapper.mapAsync(updateBatchDto, UpdateBatchDto, Batch),
      )
      .then((batch) => batch)
      .catch((error) => {
        switch (error.name) {
          case 'BatchNotFoundException': {
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
  async deleteBatch(@Param('id') batchId: number): Promise<boolean> {
    return this.batchService
      .deleteBatch(batchId)
      .then((batchDeleted) => !!batchDeleted)
      .catch((error) => {
        switch (error.name) {
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }
}
