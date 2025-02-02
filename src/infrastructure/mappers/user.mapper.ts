import { CustomError, UserEntity } from "../../domain";

export class UserMapper{
    // no usaremos inyección de dependencias, por lo que manejamos todos con métodos estaticos

    // recibe un objeto con keys de tipo string y el valor puede ser any
    // el objeto es lo que nos retorna la base de datos
    static userEntityFromObject(object: { [key: string]:any }){
        // puede que nos retorne id o _id
        const { id, _id, nombres, apellidos,celular, correo, password } = object;

        // realizamos la validaciones
        if ( !_id || !id ) {
            throw CustomError.badRequest('Missing id');
        }

        if ( !nombres ) throw CustomError.badRequest('Missing name');
        if ( !apellidos ) throw CustomError.badRequest('Missing lastname');
        if ( !celular ) throw CustomError.badRequest('Missing celular');
        if ( !correo ) throw CustomError.badRequest('Missing email');
        if ( !password ) throw CustomError.badRequest('Missing password');


        return new UserEntity(
            _id || id, // _id o id
            nombres, 
            apellidos,
            celular,
            correo,
            password
        );
    }

}

