import express from 'express';
import animeRouter from './src/routes/anime.routes.js';
import { errorHandler } from './src/middleware/errorHandler.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));


// http://localhost:3000/api/v1
app.use('/api/v1', animeRouter);

app.use(errorHandler)

// Corre en el http://localhost:3000
app.listen(PORT,() =>{
    console.log(`Servidor arriba en el puerto: ${PORT}`)
})

export default app;