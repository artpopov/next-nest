import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { UserEntity } from './entities/user.entity';
import { UserModel } from './model/auth.model';
import { JwtService } from '@nestjs/jwt';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: MongoRepository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(dto: AuthDto) {
    const password = await hash(dto.password, SALT_ROUNDS);
    return this.repository.save(
      new UserEntity({ email: dto.login, passwordHash: password }),
    );
  }

  async findUserByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  async findAll() {
    return this.repository.find();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<UserModel, 'email'>> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Пользователь с таким  email не найден');
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Неверный пароль');
    }
    return {
      email: user.email,
    };
  }

  async login(email: string) {
    const payload = { email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
