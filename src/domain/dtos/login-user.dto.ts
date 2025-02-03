import { Validators } from '../../config';

export class LoginUserDto {
    constructor(
        public correo: string,
        public clave: string
    ) {}
    // retriana un arreglo con un string del mensaje de error y el objeto de login
    static create( object: { [ key: string ]: any; } ): [ string?, LoginUserDto?] {

        const { correo, clave } = object;

        if ( !correo ) return [ 'Ingrese el correo' ];
        if ( !Validators.email.test( correo ) ) return [ 'Correo no es válido' ];
        if ( !clave ) return ['Ingrese la contraseña'];
        if ( clave.length < 6 ) return ['Contraseña debe tener 6 o más caracteres'];


        return [
            undefined, // mensaje de error
            new LoginUserDto(correo, clave)
        ];
    }
}