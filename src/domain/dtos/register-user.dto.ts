import { Validators } from "../../config";
export class RegisterUserDto{

    private constructor(
        public tipo_usuario: string,
        public nombre: string,
        public correo: string,
        public clave: string,
        public direccion: string,
    ){
        
    }

    static create(object:{ [key:string]:any }):[string?, RegisterUserDto?]{
        const {nombre, tipo_usuario, correo, clave, direccion} = object;
        
        // Validaciones
        if (!nombre) return ['Missing name'];
        if (!tipo_usuario) return ['Missing type user'];
        if (!direccion) return ['Missing address'];
        if (!correo) return ['Missing email'];
        if (!Validators.email.test(correo)) return ['Email is not valid'];
        if (!clave) return ['Missing password'];
        if (clave.length < 6) return ['Password to short'];

        return [ 
            undefined, // mensaje de error
            new RegisterUserDto(nombre,tipo_usuario, correo.toLowerCase(), clave, direccion) // creo la instancia usando el constructor privado recien
        ]
    }
}
