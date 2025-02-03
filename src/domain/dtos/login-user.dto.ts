import { Validators } from '../../config';

export class LoginUserDto {
    constructor(
        public email: string,
        public password: string
    ) {}
    // retriana un arreglo con un string del mensaje de error y el objeto de login
    static create( object: { [ key: string ]: any; } ): [ string?, LoginUserDto?] {

        const { email, password } = object;

        if ( !email ) return [ 'Missing email' ];
        if ( !Validators.email.test( email ) ) return [ 'Email is not valid' ];
        if ( !password ) return ['Missing password'];
        if ( password.length < 6 ) return ['Password too short'];


        return [
            undefined, // mensaje de error
            new LoginUserDto(email, password)
        ];
    }
}