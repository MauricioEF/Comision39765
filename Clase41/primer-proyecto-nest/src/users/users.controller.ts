import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    if(!createUserDto.firstName||!createUserDto.email){
      throw new HttpException('Incomplete values',HttpStatus.BAD_REQUEST);
    }
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    const users =  this.usersService.findAll();
    return {status:"success",payload:users}
  }

  @Get('/pruebaReqRes/:a')
  findWithReq(@Req() request:Request,@Res() response:Response) {
    //Nota cómo gracias a ésto, ya podemos acceder a las variables que acostumbramos
    console.log(request.query);
    console.log(request.params);
    console.log(request.body);
    return response.status(400).send({status:"error",error:"ok"})
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(+id);
    if(!user) throw new HttpException('User not found',HttpStatus.NOT_FOUND);
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
