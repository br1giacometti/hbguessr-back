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
import { CreateAplicatorDto } from '../dto/Aplicator/CreateFieldDto';
import Aplicator from 'Stock/domain/models/Aplicator';
import { AplicatorDto } from '../dto/Aplicator/AplicatorDto';
import AplicatorService from 'Stock/application/service/AplicatorService';

@Controller('aplicator')
export default class AplicatorController {
  constructor(
    private aplicatorService: AplicatorService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(Aplicator, AplicatorDto, { isArray: true }))
  async getAllAplicators(): Promise<AplicatorDto[]> {
    return this.aplicatorService
      .fetchAllaplicators()
      .then((aplicator) => aplicator);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(Aplicator, AplicatorDto))
  async getAplicatorById(
    @Param('id') aplicatorId: string,
    @I18n() i18n: I18nContext,
  ): Promise<AplicatorDto> {
    return this.aplicatorService
      .findAplicatorById(parseInt(aplicatorId))
      .then((point) => point)
      .catch((error) => {
        switch (error.name) {
          case 'AplicatorNotFoundException': {
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
  @UseInterceptors(MapInterceptor(Aplicator, AplicatorDto))
  async login(
    @Body() aplicatorDto: CreateAplicatorDto,
    @I18n() i18n: I18nContext,
  ): Promise<AplicatorDto> {
    return this.aplicatorService
      .createAplicator(
        await this.mapper.mapAsync(aplicatorDto, CreateAplicatorDto, Aplicator),
      )
      .then((aplicator) => aplicator)
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
  @UseInterceptors(MapInterceptor(Aplicator, AplicatorDto))
  async updateAplicator(
    @Body() createAplicatorDto: CreateAplicatorDto,
    @Param('id') aplicatorId: string,
    @I18n() i18n: I18nContext,
  ): Promise<AplicatorDto> {
    return this.aplicatorService
      .updateAplicator(
        parseInt(aplicatorId),
        await this.mapper.mapAsync(
          createAplicatorDto,
          CreateAplicatorDto,
          Aplicator,
        ),
      )
      .then((aplicator) => aplicator)
      .catch((error) => {
        switch (error.name) {
          case 'AplicatorNotFoundException': {
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
  async deleteAplicator(@Param('id') aplicatorId: number): Promise<boolean> {
    return this.aplicatorService
      .deleteAplicator(aplicatorId)
      .then((aplicatorDeleted) => !!aplicatorDeleted)
      .catch((error) => {
        switch (error.name) {
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }
}
