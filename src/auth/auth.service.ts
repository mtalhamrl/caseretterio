import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '../user/user.service'; // UserService'yi ekliyoruz

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  // Kullanıcı adı ile token oluşturma
  async login(username: string) {
    // Kullanıcıyı veritabanında doğrula
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new Error('User not found');
    }

    // JWT payload oluşturuluyor
    const payload: JwtPayload = { username: user.username, sub: user.userId };

    // Token oluşturuluyor
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
