export class UserEntity{
    constructor(
        public id_usuario: number,
        public tipo_usuario: string,
        public nombre: string,
        public correo: string,
        public clave: string,
        public direccion: string,
    ){
    }
}