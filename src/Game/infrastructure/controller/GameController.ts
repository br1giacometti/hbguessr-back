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

import Game from 'Game/domain/models/Game';
import { GameDto } from '../dto/Game/GameDto';
import { CreateGameDto } from '../dto/Game/CreateGameDto';
import { UpdateGameDto } from '../dto/Game/UpdateGameDto';
import GameService from 'Game/application/service/GameService';
import { InjectMapper, MapInterceptor } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Controller('Game')
export default class GameController {
  constructor(
    private GameService: GameService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(Game, GameDto, { isArray: true }))
  async getAllGames(): Promise<GameDto[]> {
    return this.GameService.fetchAllgames().then((Game) => Game);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MapInterceptor(Game, GameDto))
  async getGameById(
    @Param('id') GameId: string,
    @I18n() i18n: I18nContext,
  ): Promise<GameDto> {
    return this.GameService.findGameById(parseInt(GameId))
      .then((point) => point)
      .catch((error) => {
        switch (error.name) {
          case 'GameNotFoundException': {
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
  @UseInterceptors(MapInterceptor(Game, GameDto))
  async login(@Body() gameDto: CreateGameDto): Promise<GameDto> {
    console.log('game controller', gameDto);
    return this.GameService.createGame(
      await this.mapper.mapAsync(gameDto, CreateGameDto, Game),
    )
      .then((game) => game)
      .catch((error) => {
        switch (error.name) {
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteGame(@Param('id') GameId: number): Promise<boolean> {
    return this.GameService.deleteGame(GameId)
      .then((GameDeleted) => !!GameDeleted)
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
  @UseInterceptors(MapInterceptor(Game, GameDto))
  async updateLocation(
    @Body() updateGameDto: UpdateGameDto,
    @Param('id') LocationId: string,
    @I18n() i18n: I18nContext,
  ): Promise<GameDto> {
    return this.GameService.updateGame(
      parseInt(LocationId),
      await this.mapper.mapAsync(updateGameDto, UpdateGameDto, Game),
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
}
