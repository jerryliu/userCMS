import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
// import { TeamService } from '../teams/team.service';

import { User } from './user.entity';
import { UserInput } from './user.input';
import { user } from 'firebase-functions/v1/auth';
import to from 'await-to-js';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User> // @Inject(forwardRef(() => TeamService)) // private readonly teamService: TeamService
  ) {}

  findAll() {
    return this.userRepository.find({
      // relations: ['teams'],
    });
  }

  findById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['friends'],
    });
  }

  async createUser(input: UserInput) {
    console.log(input, 'userdata');
    const user = new User();
    user.name = input.name;
    user.email = input.email;
    user.password = input?.password;
    user.phone = input?.phone;
    user.picture = input?.picture;
    user.company = input?.company;

    const [err, data] = await to(this.userRepository.save(user));

    if (err) throw new BadRequestException(err.message);
    return data;
    // const user = await this.userRepository.create({
    //   // id: 1,
    //   name: 'Timber',
    //   password: '1234',
    //   email: 'Saw',
    // });
    // const user = this.userRepository.create({
    //   // id: 1,
    //   name: 'Timber',
    //   email: 'Saw',
    //   password
    // });
    // const user = await this.userRepository.save(
    //   this.userRepository.create(data)
    // );
    // // if (data.teamId) {
    // //   await this.teamService.addMember(data.teamId, user.id);
    // // }
    return user;
  }

  findByIds(ids: number[]) {
    return this.userRepository.find({
      where: { id: In(ids) },
      // relations: ['teams'],
    });
  }
}
