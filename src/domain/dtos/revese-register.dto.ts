
export class RegisterReserveDto{

    private constructor(
        public id_usuario: number,
        public id_sede: number,
        public id_estado: number,
        public id_zona: number,
        public fecha: string,
        public cantidad_personas: number,
        public requerimientos: string,
    ){
        
    }

    static create(object:{ [key:string]:any }):[string?, RegisterReserveDto?]{
        const {id_usuario,id_sede,id_estado,id_zona,fecha,cantidad_personas,requerimientos} = object;
        // Validaciones
        if (!id_usuario) return ['Debe ingresar el usuario'];
        if (!id_estado) return ['Debe ingresar el estado'];
        if (!id_sede) return ['Debe ingresar la sede'];
        if (!id_zona) return ['Debe ingresar la zona'];
        if (!fecha) return ['Debe ingresar la fecha'];
        if (!cantidad_personas) return ['Debe ingresar la cantidad de personas'];
        if (cantidad_personas <= 0) return ['La cantidad de personas debe ser mayor a cero'];

        return [ 
            undefined, // mensaje de error
            new RegisterReserveDto(id_usuario,id_sede,id_estado,id_zona,fecha,cantidad_personas,requerimientos ) // creo la instancia usando el constructor privado recien
        ]
    }
}