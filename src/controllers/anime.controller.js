import { NotFoundError } from "../error/typesError.js";
import { Anime } from "../models/anime.model.js";

export const crearNuevoAnime = async(req,res,next) =>{
    try{
        const data = req.body;
        const anime = await Anime.createAnime(data);

        res.status(201).json({
            message: 'Anime creado con exito',
            status:201,
            data:anime
        })
    }catch(error){
        next(error);
    }
}
export const buscarAnimePorId = async(req,res) =>{
    try {
        const { id } = req.params;
        const anime = await Anime.findById(id);

        if (!anime) throw new NotFoundError("La data se encuentra vacía", `No encontramos el id del anime: ${id}`);

        res.status(200).json({
            messsage: 'Anime Encontrado',
            status: 200,
            anime
        })
    } catch (error) {
         res.status(500).json({
           message: "Error al obtener el Anime",
           status: 500,
           error,
         });
    }
}

export const buscarAnimePorNombre = async(req,res) =>{
    try {
        const { nombre } = req.params;
        const anime = await Anime.findByName(nombre);

        if (!anime) throw new NotFoundError("La data se encuentra vacía", `No encontramos el nombre del anime: ${nombre}`);

        res.status(200).json({
            messsage: 'Anime Encontrado',
            status: 200,
            anime
        })
    } catch (error) {
         res.status(500).json({
           message: "Error al obtener el Anime",
           status: 500,
           error,
         });
    }
}

export const obtenerTodosLosAnimes = async(req,res) =>{
    try{
        const data = await Anime.getAllAnimes();
        if(!data) throw new NotFoundError('No existen los datos', `No se encontraron los datos solictados en la ruta correspondiente`)

        res.status(200).json({
            message: 'Animes Encontrados!',
            status: 200,
            data
        });
    }catch(error){
        res.status(500).json({
            message: "Error al obtener los animes",
            status: 500,
            error,
        });
    }
}
export const eliminarAnimePorId = async(req,res) =>{
    try {
        const { id } = req.params;
        const anime = await Anime.deleteAnime(id);

        if (!anime) throw new NotFoundError("La data se encuentra vacía", `No encontramos el id del anime: ${id}`);

        res.status(200).json({
            messsage: `Anime con el id ${id} borrado con éxito`,
            status: 200,
            animeDeleted: anime
        })
    } catch (error) {
         res.status(500).json({
           message: "Error al obtener el Anime",
           status: 500,
           error,
         });
    }
}
export const modificarAnimePorId = async(req,res) =>{
    try {
        const { id } = req.params;
        const dataAnime = req.body;
        const updateAnimexd = await Anime.updateAnime(id,dataAnime);

        if (!updateAnimexd) throw new NotFoundError("La data se encuentra vacía", `No encontramos el id del anime: ${id}`);

        res.status(201).json({
            messsage: `Anime con el id ${id} modificado con éxito`,
            status: 201,
            oldData: updateAnimexd,
            newData: dataAnime
        })
    } catch (error) {
         res.status(500).json({
           message: "Error al obtener el Anime",
           status: 500,
           error,
         });
    }
}