import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './poke-response.interface';


@Injectable()
export class SeedService {

  private readonly axios:AxiosInstance


 async executeSeed() {
  //extraigo la data de la api
  const {data} = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')
  //  recorro toda la data para extraer solo la informacion que necesito enviar a mi base de datos
  return data.results.forEach(({name, url}) => {

    const segments = url.split('/');
    // console.log({segments});
    const no = +segments[segments.length - 2];
    console.log({name, no});
  }
  )
 }
}

