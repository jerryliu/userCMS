import { Field, InputType, ID } from '@nestjs/graphql';
import {
  Matches,
  IsEmail,
  IsOptional,
  IsNumberString,
  IsNumber,
  MinLength,
  ArrayNotEmpty,
  IsArray,
} from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @Matches(/^[a-zA-Z0-9_-]{3,15}$/)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6) // at least 8 characters
  password: string;

  @Field()
  @IsOptional()
  @IsNumberString()
  phone: string;

  @Field()
  picture: string;

  @Field()
  @IsOptional()
  company: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true }) // ensures each item is a number
  friendIds?: number[];
}
