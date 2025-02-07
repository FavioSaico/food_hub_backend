
export class UserResponseDto{

    constructor(
        public id_usuario: number,
        public tipo_usuario: string,
        public nombre: string,
        public correo: string,
        public direccion: string,
    ){
        
    }
}