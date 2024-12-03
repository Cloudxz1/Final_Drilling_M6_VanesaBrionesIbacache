import { JSONError, NotFoundError } from "../error/typesError.js";
import { Anime } from "../models/anime.model.js";
import { createFile, readFile } from "../services/fileService.js"


export const createDataFile = async (data, dataPath) => {
    try {
        const datafile = await readFile(dataPath);
        let dataJson = null
    
        !datafile || datafile.length === 0 ? (dataJson = [data]) : dataJson = [ ...datafile, data ]
    
        await createFile(dataJson, dataPath)
        
    } catch (error) {
        throw new JSONError(`Error al gestionar la creación del archivo con la data`, error)
    }
}
export const getAllAnime = async(pathData) => {
    try{
        const data = await readFile(pathData);
        return data;
    }catch(error){
        throw new NotFoundError('No se pudo acceder a los datos');
    }
}

export const getDataById = async(id,pathData) =>{
    try{
        const data = await readFile(pathData);
        const dataFound = data.find(dataFound => dataFound.id === id);

        return dataFound;
    }catch(error){
        throw new NotFoundError('No se pudo acceder al dato por id');
    }
}

export const getDataByName = async(nombre,pathData) =>{
    try{
        const data = await readFile(pathData);
        const dataFound = data.find(dataFound => dataFound.nombre === nombre);

        return dataFound;
    }catch(error){
        throw new NotFoundError('No se pudo acceder al dato por nombre');
    }
}
export const deleteAnimeById = async(id,pathData) =>{
    try{
        const data = await readFile(pathData);
        const indexAnime = data.findIndex(dataFound => dataFound.id === id);

        if(indexAnime === -1)
            throw new JSONError('No se pudo encontrar la data');
        
        
        const animeDelete = data[indexAnime];
        data.splice(indexAnime,1);

        await createFile(data,pathData);

        return animeDelete;
    }catch(error){
        throw new JSONError('No se pudo eliminar el anime, y no se pudo actualizar la data')
    }
}

export const updateAnimeById = async(id, newDataAnime, pathData) =>{
    try{
        const data = await readFile(pathData);
        const indexAnime = data.findIndex(dataFound => dataFound.id === id);

        if(indexAnime === -1)
            throw new JSONError('No se pudo realizar la actualización del anime');

        // Almacenar el id original, ya que, como sale el codigo de abajo crea un nuevo objeto con los atributos actualizados, pero siempre crea un id diferente
        // por lo cual, por eso guardo el id original para que no se modifique 
        const originalId = data[indexAnime].id;

        // Validar los nuevos datos con la clase Anime
        const animeToUpdate = new Anime(
            newDataAnime.nombre ?? data[indexAnime].nombre,
            newDataAnime.genero ?? data[indexAnime].genero,
            newDataAnime.anio ?? data[indexAnime].anio,
            newDataAnime.autor ?? data[indexAnime].autor
        );

        const oldAnimeData = { ...data[indexAnime] };

        data[indexAnime] = {
            ...animeToUpdate.getAllProperties(),
            id: originalId 
        };

        await createFile(data, pathData);

        return oldAnimeData;


    }catch(error){
        throw new JSONError('No se pudo actualizar el anime, y no se pudo actualizar la data')
    }
}