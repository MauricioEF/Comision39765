import { Module, NestModule, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CartsModule } from './carts/carts.module';
import RequestLogger from './middlewares/requestLogger';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  
  imports: [UsersModule, CartsModule,ConfigModule.forRoot(), MongooseModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:async(config:ConfigService)=>({
        uri: config.get<string>('MONGO_URL')
    })
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLogger).exclude({path:'/users',method:RequestMethod.GET}).forRoutes({path:'*',method:RequestMethod.ALL})
    // consumer.apply(Log).forRoutes(UsersController)
  }
  //Agrego aquí mis middlewares
  
}
