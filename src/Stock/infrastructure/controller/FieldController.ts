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
import FieldService from 'Stock/application/service/FieldService';
import Field from 'Stock/domain/models/Field';
import { CreateFieldDto } from '../dto/Field/CreateFieldDto';
import { FieldDto } from '../dto/Field/FieldDto';
import { UpdateFieldDto } from '../dto/Field/UpdateFieldDto';

@Controller('field')
export default class FieldController {
  constructor(
    private fieldService: FieldService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(Field, FieldDto, { isArray: true }))
  async getAllFieldss(): Promise<FieldDto[]> {
    return this.fieldService.fetchAllFields().then((field) => field);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(Field, FieldDto))
  async getFieldById(
    @Param('id') fieldId: string,
    @I18n() i18n: I18nContext,
  ): Promise<FieldDto> {
    return this.fieldService
      .findFieldById(parseInt(fieldId))
      .then((field) => field)
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

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(Field, FieldDto))
  async login(@Body() fieldDto: CreateFieldDto): Promise<FieldDto> {
    return this.fieldService
      .createField(await this.mapper.mapAsync(fieldDto, CreateFieldDto, Field))
      .then((field) => field)
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
  @UseInterceptors(MapInterceptor(Field, FieldDto))
  async updateField(
    @Body() updateFieldDto: UpdateFieldDto,
    @Param('id') fieldId: string,
    @I18n() i18n: I18nContext,
  ): Promise<FieldDto> {
    return this.fieldService
      .updateField(
        parseInt(fieldId),
        await this.mapper.mapAsync(updateFieldDto, UpdateFieldDto, Field),
      )
      .then((field) => field)
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

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteField(@Param('id') fieldId: number): Promise<boolean> {
    return this.fieldService
      .deleteField(fieldId)
      .then((fieldDeleted) => !!fieldDeleted)
      .catch((error) => {
        switch (error.name) {
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }
}
