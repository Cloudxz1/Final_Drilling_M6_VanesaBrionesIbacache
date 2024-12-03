import { ValidationError } from "../error/typesError.js";

export class Validate {
    static animeName(animeName, fieldName){
        const animeNameRegex = /^[a-zA-Z0-9,\- ]+$/;
        if(!animeNameRegex.test(animeName))
            throw new ValidationError(`${fieldName} debe contener solamente letras`,`Error al validar el regex ${animeNameRegex}`);
        return animeName;
    }

    static year(value, fieldName){
        if(typeof value !== "number" || value < 0)
            throw new ValidationError(`${fieldName} debe contener solamente números`,`Verifica que el valor sea númerico y que sea mayor que 0`);
        return value;
    }
}