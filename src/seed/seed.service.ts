import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';


@Injectable()
export class SeedService {

  
  constructor(
    private readonly pokemonService: PokemonService,
  ) {}
  private readonly axios:AxiosInstance


 async executeSeed() {
  //extraigo la data de la api
  const {data} = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
  //  recorro toda la data para extraer solo la informacion que necesito enviar a mi base de datos
  return data.results.forEach(({name, url}) => {

    const segments = url.split('/');
    // console.log({segments});
    const no = +segments[segments.length - 2];
    console.log({name, no});
    this.pokemonService.create({
      name,
      no
    })

  }
  )
 }
}

