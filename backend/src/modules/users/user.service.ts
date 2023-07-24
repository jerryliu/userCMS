import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface UserWithToken extends User {
  token: string;
}
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['friends'],
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username: user.name, id: user.id };

      return {
        ...user,
        token: this.jwtService.sign(payload),
      };
    } else {
      throw new Error('Invalid credentials');
    }
  }

  findById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['friends'],
    });
  }
}
