import { Column } from 'typeorm';
import { Field, InputType } from '@nestjs/graphql';
import { Matches, IsEmail, IsOptional, IsNumberString } from 'class-validator';

@InputType()
export class UserInput {
  @Field({ nullable: false })
  @Matches(/^[a-zA-Z0-9_-]{3,15}$/)
  name: string;

  @Field({ nullable: false })
  @IsEmail()
  email: string;

  @Field({ nullable: false })
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumberString()
  phone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  picture: string;

  @Field({ nullable: true })
  @IsOptional()
  company?: string;

  @Field(() => [Number], { nullable: true })
  @IsOptional()
  friendIds: number[];
}