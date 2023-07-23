import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'topSecret51', // Replace this with your own secret
      signOptions: { expiresIn: '180m' }, // Configure token expiration if needed
    }),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService], // Export the service if it will be used outside of this module
})
export class UserModule {}
