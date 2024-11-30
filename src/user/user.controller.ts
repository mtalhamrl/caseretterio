import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body('userId') userId: string,
    @Body('username') username: string,
  ) {
    console.log('uid: ', userId);
    return this.userService.createUser(userId, username);
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
