import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async createGame(
    @Body('gameId') gameId: string,
    @Body('gameName') gameName: string,
  ) {
    console.log('gid', gameId);
    return this.gameService.createGame(gameId, gameName);
  }

  @Get(':gameId')
  async getGameById(@Param('gameId') gameId: string) {
    return this.gameService.getGameById(gameId);
  }

  @Get()
  async getAllGames() {
    return this.gameService.getAllGames();
  }
}
