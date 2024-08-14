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

import GameResult from 'Game/domain/models/GameResult';
import { GameResultDto } from '../dto/GameResult/GameResultDto';
import { CreateGameResultDto } from '../dto/GameResult/CreateGameResultDto';
import { UpdateGameResultDto } from '../dto/GameResult/UpdateGameResultDto';
import GameResultService from 'Game/application/service/GameResultService';
import { InjectMapper, MapInterceptor } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Controller('GameResult')
export default class GameResultController {
  constructor(
    private GameResultService: GameResultService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(GameResult, GameResultDto, { isArray: true }))
  async getAllGameResults(): Promise<GameResultDto[]> {
    return this.GameResultService.fetchAllgameresults().then(
      (GameResult) => GameResult,
    );
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(GameResult, GameResultDto))
  async getGameResultById(
    @Param('id') GameResultId: string,
    @I18n() i18n: I18nContext,
  ): Promise<GameResultDto> {
    return this.GameResultService.findGameResultById(parseInt(GameResultId))
      .then((point) => point)
      .catch((error) => {
        switch (error.name) {
          case 'GameResultNotFoundException': {
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
  @UseInterceptors(MapInterceptor(GameResult, GameResultDto))
  async login(
    @Body() GameResultDto: CreateGameResultDto,
    @I18n() i18n: I18nContext,
  ): Promise<GameResultDto> {
    return this.GameResultService.createGameResult(
      await this.mapper.mapAsync(
        GameResultDto,
        CreateGameResultDto,
        GameResult,
      ),
    )
      .then((GameResult) => GameResult)
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
  async deleteGameResult(@Param('id') GameResultId: number): Promise<boolean> {
    return this.GameResultService.deleteGameResult(GameResultId)
      .then((GameResultDeleted) => !!GameResultDeleted)
      .catch((error) => {
        switch (error.name) {
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }
}
