export class UpdateStatePurchaseDto{

    private constructor(
        public id_compra: number,
        public id_estado: number
    ){
        
    }

    static create(object:{ [key:string]:any }):[string?, UpdateStatePurchaseDto?]{
        const {id_compra, id_estado } = object;
        // Validaciones
        if (!id_compra) return ['Debe ingresar el usuario'];
        if (!id_estado) return ['Debe ingresar el estado'];

        return [
            undefined, // mensaje de error
            new UpdateStatePurchaseDto(id_compra, id_estado) // creo la instancia usando el constructor privado recien
        ]
    }
}