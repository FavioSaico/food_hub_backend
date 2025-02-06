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
        const {tipo_usuario, nombre, correo, clave, direccion} = object;
        
        // Validaciones
        if (!nombre) return ['Ingrese el nombre'];
        if (!tipo_usuario) return ['Defina el tipo de usuario'];
        if (!direccion) return ['Ingrese la dirección'];
        if (!correo) return ['Ingrese el correo'];
        if (!Validators.email.test(correo)) return ['Correo no es válido'];
        if (!clave) return ['Ingrese la contraseña'];
        if (clave.length < 6) return ['Contraseña debe tener 6 o más caracteres'];

        return [ 
            undefined, // mensaje de error
            new RegisterUserDto(tipo_usuario, nombre, correo.toLowerCase(), clave, direccion) // creo la instancia usando el constructor privado recien
        ]
    }
}
