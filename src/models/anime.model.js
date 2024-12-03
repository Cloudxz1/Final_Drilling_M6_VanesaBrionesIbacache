import {v4 as uuidv4} from 'uuid';
import { createDataFile, deleteAnimeById, getAllAnime, getDataById, getDataByName, updateAnimeById } from "../utils/fileUtils.js";
import { Validate } from '../utils/Validaciones.js';
import { InternalServerErrorTest } from '../error/typesError.js';
export class Anime {

    #id
    #nombre
    #genero
    #anio
    #autor

    constructor(nombre,genero,anio,autor){
        this.#id = uuidv4();
        this.#nombre =  Validate.animeName(nombre,"Nombre");
        this.#genero = Validate.animeName(genero,"Genero");
        this.#anio = Validate.year(anio);
        this.#autor = Validate.animeName(autor,"Autor");

        // this.#id = uuidv4();
        // this.#nombre = nombre;
        // this.#genero = genero;
        // this.#anio = anio;
        // this.#autor = autor;
    }
    
    get id() { return this.#id }
    get nombre() { return this.#nombre }
    get genero() { return this.#genero }
    get anio() { return this.#anio }
    get autor() { return this.#autor }
    
    setId(id) { this.#id = id }

    /**
     *  Tengo un problema al actualizar el usuario, deberia de validarse el tipo de dato pero lo toma igual e actualiza
     *   
     */


    setNombre(newName) { 
        Validate.animeName(newName,"Nombre");
        this.#nombre = newName;
    }
    setGenero(newGenero) { 
        
        Validate.animeName(newGenero,"Genero");
        this.#genero = newGenero;
    }
    setAnio(newAnio) { 
        
        Validate.year(newAnio,"anio");
        this.#anio = newAnio;
    }
    setAutor(newAutor) { 
        
        Validate.animeName(newAutor,"Autor");
        this.#autor = newAutor;
    }

    getAllProperties(){
        return {
            id: this.#id,
            nombre: this.#nombre,
            genero: this.#genero,
            anio: this.#anio,
            autor: this.#autor,
        }
    }
    static async createAnime(data) {
        try {
            const { nombre, genero, anio, autor } = data;

            const anime = new Anime(nombre, genero, anio, autor);
            const animeObj = anime.getAllProperties();
    
            await createDataFile(animeObj, 'animes.json');
    
            return animeObj; 
        } catch (error) {
            throw new InternalServerErrorTest('Error al obtener los datos del anime', error);
        }
    }
    static async findById(id){
        try{
            const anime = await getDataById(id,'animes.json');
            return anime;
        }catch(error){
            throw new InternalServerErrorTest('Error al obtener los datos del anime', error)
        }
    }
    static async findByName(nombre){
        try{
            const anime = await getDataByName(nombre,'animes.json');
            return anime;
        }catch(error){
            throw new InternalServerErrorTest('Error al obtener los datos del anime', error)
        }
    }
    static async getAllAnimes(){
        try{
            const animes = await getAllAnime('animes.json');

            return animes;
        }catch(error){
            throw new InternalServerErrorTest('Error al obtener los datos del anime', error)
        }
    }
    static async deleteAnime(id){
        try{
            const anime = await deleteAnimeById(id,'animes.json');

            return anime;
        }catch(error){
            throw new InternalServerErrorTest('Error al obtener los datos del anime', error);
        }
    }
    static async updateAnime(id, data){
        try{
            const updateAnime = await updateAnimeById(id,data,'animes.json');
            return updateAnime;
        }catch(error){
            throw new InternalServerErrorTest('Error al obtener los datos del anime', error);
        }
    }
}