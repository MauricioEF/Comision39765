import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectModel} from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel:Model<UserDocument>){}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findOne({_id:id});
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({_id:id},{$set:updateUserDto})
  }

  remove(id: string) {
    return this.userModel.deleteOne({_id:id})
  }

}
