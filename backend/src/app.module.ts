import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { User } from './modules/users/user.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'example',
      password: 'example',
      database: 'example',
      entities: [User],
      synchronize: true,
    }),
    GraphQLModule.forRoot({ autoSchemaFile: true }),

    UserModule,
  ],
})
export class AppModule {}
