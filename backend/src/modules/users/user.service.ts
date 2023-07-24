import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AddFriendInput, UserInput } from './user.input';

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

  async createUser(data: UserInput) {
    const friends = data.friendIds
      ? await this.userRepository.findBy({
          id: In(data.friendIds),
        })
      : [];
    const user = this.userRepository.create({
      ...data,
      friends,
    });
    return this.userRepository.save(user);
  }

  async addFriend(data: AddFriendInput) {
    let user = await this.userRepository.findOne({
      where: {
        id: data.userId,
      },
      relations: ['friends'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    // get the friend from database
    let friend = await this.userRepository.findOne({
      where: { id: data.friendId },
    });
    if (!friend) {
      throw new Error('Friend not found');
    }

    // check if this friend already exists in user's friends list
    if (user.friends.some((existingFriend) => existingFriend.id == friend.id)) {
      throw new Error('This user is already a friend');
    }

    user.friends = [...user.friends, friend];
    // // save updated user
    user = await this.userRepository.save(user);

    return user;
  }
  findById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['friends'],
    });
  }
}
