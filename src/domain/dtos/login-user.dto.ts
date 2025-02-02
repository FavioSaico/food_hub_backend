import { Validators } from '../../config';

export class LoginUserDto {
    constructor(
        public correo: string,
        public password: string
    ) {}

    static create( object: { [ key: string ]: any; } ): [ string?, LoginUserDto?] {

        const { correo, password } = object;

        if ( !correo ) return [ 'Missing email' ];
        if ( !Validators.email.test( correo ) ) return [ 'Email is not valid' ];
        if ( !password ) return ['Missing password'];
        if ( password.length < 6 ) return ['Password too short'];


        return [
            undefined,
            new LoginUserDto(correo, password)
        ];
    }
}