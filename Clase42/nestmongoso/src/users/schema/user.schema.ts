import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({required:true})
    firstName:string;

    @Prop()
    lastName:string;

    @Prop({required:true,unique:true})
    email:string;

}

export const UserSchema = SchemaFactory.createForClass(User);
