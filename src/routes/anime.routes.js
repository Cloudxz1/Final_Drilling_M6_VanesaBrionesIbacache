import { Router } from "express";
import { buscarAnimePorId, buscarAnimePorNombre, crearNuevoAnime, eliminarAnimePorId, modificarAnimePorId, obtenerTodosLosAnimes } from "../controllers/anime.controller.js";

const router = Router();

router.post('/anime',crearNuevoAnime);
router.get('/anime/id/:id',buscarAnimePorId);
router.get('/anime/nombre/:nombre',buscarAnimePorNombre);
router.get('/anime',obtenerTodosLosAnimes);
router.delete('/anime/:id',eliminarAnimePorId);

router.put('/anime/:id',modificarAnimePorId);
export default router;