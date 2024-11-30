import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Redis from 'ioredis';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class LeaderboardService {
  private redis: Redis;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    // Ortam değişkenlerinden Redis bağlantı bilgilerini alıyoruz
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost', // Docker içinde 'redis', local için 'localhost'
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    });
  }

  async submitScore(
    gameId: string,
    userId: string,
    score: number,
  ): Promise<number> {
    const key = `leaderboard:${gameId}`;
    const currentScore = await this.redis.zscore(key, userId);

    // mevcut skordan daha yüksek bir skor varsa güncelle
    if (!currentScore || score > parseFloat(currentScore)) {
      await this.redis.zadd(key, score, userId);
    }

    // soraları ver
    const rank = await this.redis.zrevrank(key, userId);
    return rank !== null ? rank + 1 : -1;
  }

  //
  async getTopPlayers(
    gameId: string,
    limit: number,
    offset: number,
  ): Promise<any[]> {
    const key = `leaderboard:${gameId}`;

    // Redis'ten kullanıcı ID'lerini ve skorları al
    const players = await this.redis.zrevrange(
      key,
      offset,
      offset + limit - 1,
      'WITHSCORES',
    );

    const result = [];
    for (let i = 0; i < players.length; i += 2) {
      const userId = players[i];
      const score = parseFloat(players[i + 1]);

      // MongoDB'den username'i al
      const user = await this.userModel.findOne({ userId }).exec();
      const username = user ? user.username : 'Unknown';

      result.push({ rank: offset + i / 2 + 1, username, userId, score });
    }

    return result;
  }

  async getPlayerRank(gameId: string, userId: string): Promise<any> {
    const key = `leaderboard:${gameId}`;

    // Redis'ten kullanıcı sıralaması ve skoru al
    const rank = await this.redis.zrevrank(key, userId);
    const score = await this.redis.zscore(key, userId);

    // MongoDB'den username'i al
    const user = await this.userModel.findOne({ userId }).exec();
    const username = user ? user.username : 'Unknown';

    return rank !== null
      ? { rank: rank + 1, username, userId, score: parseFloat(score) }
      : { rank: -1, username, userId, score: 0 };
  }
}
