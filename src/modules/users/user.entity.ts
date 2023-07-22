import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';
// import { Friend } from './friendship.entity';
import { Friend } from './friend.entity';
// import { Team } from '../teams/team.model';
// @ObjectType({ isAbstract: true })
// @InputType({ isAbstract: true })
@ObjectType()
@Entity('users')
export class User {
  //   @PrimaryColumn('varchar', { length: 36 })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Field({ nullable: false })
  name: string;

  @Column({ unique: true })
  @Field({ nullable: false })
  email: string;

  @Column()
  @Field({ nullable: false })
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  picture?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  company?: string;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable()
  friends: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
