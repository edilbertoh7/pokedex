import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    //modulo para servir archivos estaticos
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'), 
       }),
       //conexion a la base de datos mongoDB
        MongooseModule.forRoot('mongodb://localhost/nest-pokemon'),

    PokemonModule,

    CommonModule, 
      
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
