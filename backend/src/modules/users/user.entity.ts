import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Field, ID, ObjectType } from '@nestjs/graphql';
@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Field({ nullable: false })
  name: string;

  @Column({ unique: true })
  @Field({ nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false, select: false }) //It is select as false
  @Field({ nullable: false })
  password: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  phone?: string;

  @Column('text')
  @Field({ nullable: true })
  picture?: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  company?: string;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable()
  friends: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
