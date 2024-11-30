import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Post('submit-score')
  @UseGuards(JwtAuthGuard)
  async submitScore(
    @Body('gameId') gameId: string,
    @Body('userId') userId: string,
    @Body('score') score: number,
  ) {
    const rank = await this.leaderboardService.submitScore(
      gameId,
      userId,
      score,
    );
    console.log('rank:', rank);
    return { gameId, userId, score, rank };
  }

  @Get('top')
  async getTopPlayers(
    @Query('gameId') gameId: string,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    const offset = (page - 1) * limit;
    return this.leaderboardService.getTopPlayers(gameId, limit, offset);
  }

  @Get('rank')
  async getPlayerRank(
    @Query('gameId') gameId: string,
    @Query('userId') userId: string,
  ) {
    return this.leaderboardService.getPlayerRank(gameId, userId);
  }
}
