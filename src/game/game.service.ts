import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './schema/game.schema';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  async createGame(gameId: string, gameName: string): Promise<Game> {
    const newGame = new this.gameModel({ gameId, gameName });
    return newGame.save();
  }

  async getGameById(gameId: string): Promise<Game | null> {
    return this.gameModel.findOne({ gameId });
  }

  async getAllGames(): Promise<Game[]> {
    return this.gameModel.find();
  }
}
