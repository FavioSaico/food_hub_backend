import { Validators } from "../../config";

// los dtos pueden ser clases, funciones o factory functions
export class RegisterUserDto{

    // private para evitar que otro desarrollador use el contructor
    // pues recibiremos los datos como Body, usamos el método create, relizaremos validaciones y recien crearemos el objeto usando este contructor
    private constructor(
        public nombres: string,
        public apellidos: string,
        public celular: string,
        public correo: string,
        public password: string,
    ){
        
    }

    // Método estatico que recive objeto y dentro un arreglo con la propiedad key de tipo string
    // El método retorna un arreglo con dos propiedades, la primera tipo string y la 2da RegisterUserDto
    static create(object:{ [key:string]:any }):[string?, RegisterUserDto?]{
        const {nombres, apellidos,celular, correo, password} = object;
        
        // Validaciones
        // si un elemento no vienen, no se envia la instancia de RegisterUserDto
        if (!nombres) return ['Missing name', undefined];
        if (!apellidos) return ['Missing name'];
        if (!correo) return ['Missing email'];
        if (!celular) return ['Missing celular'];
        if (!Validators.email.test(correo)) return ['Email is not valid'];
        if (!password) return ['Missing password'];
        if (password.length < 6) return ['Password to short'];

        return [ 
            undefined, // no retorno un mensaje de error
            new RegisterUserDto(nombres,apellidos,celular, correo.toLowerCase(), password) // creo la instancia usando el constructor privado recien
        ]
    }
}
