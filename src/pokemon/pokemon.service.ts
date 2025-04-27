import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    //codigo necesario para poder inyectar el modelo de pokemon
    @InjectModel(Pokemon.name)
    //inicializa el modelo de pokemon
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  //creo el metodo de insercion de pokemon
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase()

    try {
      // procedo a insertar el pokemon en la base de datos
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;

    } catch (error) {

      this.handleExceptions(error);
    }
  }


  //buscar todos los pokemones
  findAll() {
    return this.pokemonModel.find()
  }


  //metodo paa buscar un pokemon por id, name o no
  async findOne(term: string) {
    
    let pokemon: Pokemon | null = null;

    // verificacion por no
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    //verificacion por mongo id
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);

    }

    //verificacion por name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() });
    }
    // manejo de error si no se encuentra el pokemon
    if (!pokemon)
      throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);

    return pokemon;
  }


  //metodo para actualizar un pokemon
  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    // verifico si existe el pokemon por el termino de busqueda
    const pokemon = await this.findOne(term);

    if(updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
try {
  await pokemon.updateOne(updatePokemonDto, { new: true });
  return{ ...pokemon.toJSON(), ...updatePokemonDto };
  
} catch (error) {
 this.handleExceptions(error);
}

  }


 async remove(id: string) {
    //verifico si existe el pokemon por el id
    // const pokemon = await this.findOne(id);
    // //si existe lo elimino
    // await pokemon.deleteOne()
    // return `Se ha eliminado  ${pokemon.name} de la base de datos`;
    // return {id}

    //esto esta bie pero la idea es no usar dos consultas para la eliinacion
    // const result = await this.pokemonModel.findByIdAndDelete(id);

  const {deletedCount} = await this.pokemonModel.deleteOne({ _id: id });

  if (deletedCount === 0) {
    throw new BadRequestException(`Pokemon with id "${id}" not found`); 
  }
  return {msg:'pokemon eliminado con exito'}
  
  }


  //metodo para manejo de errores
  //se recibe el error y se maneja dependiendo del tipo de error
  //en este caso se maneja el error de duplicado y el error generico
  private handleExceptions(error: any) {
    if (error.code === 11000) {
      // Manejo de error para duplicados
      console.log(error);
      throw new BadRequestException(`Pokemon exist in DB ${JSON.stringify(error.keyValue)}`);
    }
    // Manejo de error genérico
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }


}
