export class UpdateStateReserveDto{

    private constructor(
        public id_reserva: number,
        public id_estado: number
    ){
        
    }

    static create(object:{ [key:string]:any }):[string?, UpdateStateReserveDto?]{
        const {id_reserva, id_estado } = object;
        // Validaciones
        if (!id_reserva) return ['Debe ingresar la reserva'];
        if (!id_estado) return ['Debe ingresar el estado'];

        return [
            undefined, // mensaje de error
            new UpdateStateReserveDto(id_reserva, id_estado) // creo la instancia usando el constructor privado recien
        ]
    }
}