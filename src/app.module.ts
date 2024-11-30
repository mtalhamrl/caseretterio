import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModule } from './game/game.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/caseretterio',
    ),
    GameModule,
    LeaderboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
