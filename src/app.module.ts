import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/user.module';
// import { TeamModule } from './modules/teams/team.module';
// import { ChatsModule } from './modules/chats/chats.module';

import { GraphQLModule } from '@nestjs/graphql';
// import { Team } from './modules/teams/team.model';
import { User } from './modules/users/user.entity';
import { Friend } from './modules/users/friend.entity';
// import { User } from './user.entity';
// import { UserInput } from './user.model';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'example',
      password: 'example',
      database: 'example',
      entities: [User, Friend],
      synchronize: true,
    }),
    GraphQLModule.forRoot({ autoSchemaFile: true }),

    UserModule,
    // TeamModule,
    // ChatsModule,
  ],
})
export class AppModule {}
