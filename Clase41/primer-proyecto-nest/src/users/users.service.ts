import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  users: Array<User>;

  constructor(){
    this.users = [];
  }
  
  create(createUserDto: CreateUserDto) {
    if(this.users.length===0){
      createUserDto.id=1;
    }
    else{
      const currentId:number = this.users[this.users.length-1].id as number;
      createUserDto.id = currentId+1;
    }
    this.users.push(createUserDto);
    return createUserDto;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(u=>u.id===id);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex(u=>u.id===id);
    if(userIndex===-1) return null;
    delete updateUserDto.id;
    this.users[userIndex] = {...this.users[userIndex],...updateUserDto};
    return this.users[userIndex]
  }

  remove(id: number) {
    const userIndex = this.users.findIndex(u=>u.id===id);
    if(userIndex===-1) return null;
    this.users.splice(userIndex,1);
    return this.users;
  }
}
