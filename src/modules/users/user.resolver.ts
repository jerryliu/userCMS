import {
  Int,
  Args,
  Parent,
  Query,
  Mutation,
  Resolver,
  ResolveField,
} from '@nestjs/graphql';
import { User } from './user.entity';
import { UserInput } from './user.input';
import { UserService } from './user.service';
import { Friend } from './friend.entity';
import { forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Team } from '../teams/team.model';
import { In, Repository } from 'typeorm';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Friend)
    private friendsRepository: Repository<Friend>,
    private readonly userService: UserService // @Inject(forwardRef(() => TeamService)) // private readonly teamService: TeamService,
  ) {}
  @Query(() => [User])
  async users() {
    return this.usersRepository.find({ relations: ['friends'] });
  }

  // @Query((returns) => [User], { name: 'users', nullable: false })
  // async getUsers() {
  //   return this.userService.findAll();
  // }

  @Query((returns) => User, { name: 'user', nullable: true })
  async getUserById(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.userService.findById(id);
  }
  @Mutation(() => User)
  async createUser(@Args('input') input: UserInput) {
    // const friends = await this.friendsRepository.findByIds(input.friendIds);
    // const friends = await this.usersRepository.findBy({
    //   id: In(input.friendIds),
    // });
    const friends = input.friendIds
      ? await this.usersRepository.findBy({
          id: In(input.friendIds),
        })
      : [];
    console.log(friends);
    const user = this.usersRepository.create({ ...input, friends });
    return this.usersRepository.save(user);
  }

  // @Mutation(() => User, { name: 'createUser' })
  // async createUser(@Args('data') input: UserInput) {
  //   return this.userService.createUser(input);
  // }
}
