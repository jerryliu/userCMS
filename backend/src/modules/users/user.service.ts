import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AddFriendInput, UserInput } from './user.input';
import to from 'await-to-js';

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
      throw new BadRequestException('Invalid credentials');
    }
  }

  async createUser(data: UserInput) {
    const friends = data.friendIds
      ? await this.userRepository.findBy({
          id: In(data.friendIds),
        })
      : [];
    const newUser = this.userRepository.create({
      ...data,
      friends,
    });
    const [err, user] = await to(this.userRepository.save(newUser));
    if (err)
      throw new BadRequestException('There was an error saving the user');

    return this.userRepository.save(user);
  }

  async addFriend(data: AddFriendInput) {
    const [userErr, user] = await to(
      this.userRepository.findOne({
        where: {
          id: data.userId,
        },
        relations: ['friends'],
      })
    );

    if (userErr) {
      throw new BadRequestException(
        'There was an error while finding the user'
      );
    }
    if (!user) throw new NotFoundException('User not found');

    // get the friend from database
    const [friendErr, friend] = await to(
      this.userRepository.findOne({
        where: { id: data.friendId },
      })
    );
    if (friendErr) {
      throw new BadRequestException(
        'There was an error while finding the friend'
      );
    }
    if (!friend) throw new NotFoundException('Friend not found');

    // check if this friend already exists in user's friends list
    if (user.friends.some((existingFriend) => existingFriend.id == friend.id)) {
      throw new BadRequestException('This user is already a friend');
    }

    user.friends = [...user.friends, friend];
    // // save updated user
    const [saveErr, savedUser] = await to(this.userRepository.save(user));
    if (saveErr) {
      throw new BadRequestException('There was an error while saving the user');
    }

    return savedUser;
  }

  async findById(id: number) {
    const [err, user] = await to(
      this.userRepository.findOne({
        where: { id },
        relations: ['friends'],
      })
    );
    if (err)
      throw new BadRequestException(
        'There was an error while finding the user'
      );
    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
