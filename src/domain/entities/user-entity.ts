export class UserEntity{

    constructor(
        public id: string,
        public nombres: string,
        public apellidos: string,
        public celular: string,
        public correo: string,
        public password: string,
        // public role: string[],
        // public img?: string,
    ){

    }

}