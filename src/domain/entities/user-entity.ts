export class UserEntity{

    constructor(
        public id_usuario: string,
        public tipo_usuario: string,
        public nombre: string,
        public correo: string,
        public clave: string,
        public direccion: string,
        // public role: string[],
        // public img?: string,
    ){

    }

}