import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schema/user.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[MongooseModule,MongooseModule.forFeature([
    //Aquí elijo de qué schemas de mongoose voy a tener contexto
    {
      name:User.name,
      schema:UserSchema
    }
  ]),ConfigModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
