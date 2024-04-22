import {ConfigModule, ConfigService} from'@nestjs/config';
import { TypeOrmModule} from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { Product } from './product.entity';
import { JwtModule } from '@nestjs/jwt';
import { RestoModule } from './resto/resto.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0000',
      database: 'pizzatime',
      autoLoadEntities:true,
      synchronize:true,

    }),
    TypeOrmModule.forFeature([User,Product]),

    JwtModule.register({
      secret:'secret',
      signOptions:{expiresIn: '1d'}                
  }),
  RestoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
