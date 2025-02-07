class FoodDetailDto {
    constructor (
        public id_comida : number,
        public cantidad : number,
        public costo : number
    ) {

    }
}

export class RegisterPurchaseDto{

    private constructor(
        public id_usuario: number,
        public id_tipo_compra: number,
        public id_tipo_pago: number,
        public id_estado: number,
        public id_sede: number,
        public costo_subtotal: number,
        public costo_total: number,
        public costo_delivery: number,
        public lista_comidas : FoodDetailDto[]
    ){
        
    }

    static create(object:{ [key:string]:any }):[string?, RegisterPurchaseDto?]{
        const {id_usuario, id_tipo_compra, id_tipo_pago,id_estado,id_sede,
                costo_subtotal,costo_total,costo_delivery, lista_comidas} = object;
        // Validaciones
        if (!id_usuario) return ['Debe ingresar el usuario'];
        if (!id_tipo_compra) return ['Debe ingresar el tipo de compra'];
        if (!id_tipo_pago) return ['Debe ingresar el tipo de pago'];
        if (!id_estado) return ['Debe ingresar el estado'];
        if (!id_sede) return ['Debe ingresar la sede'];
        if (Number(costo_subtotal) < 0) return ['El subtotal debe ser mayor a 0'];
        if (Number(costo_total) < 0) return ['El total debe ser mayor a 0'];
        if (Number(costo_delivery) <= 0) return ['El costo por delivery debe ser igual o mayor a 0'];
        if (lista_comidas.length <= 0) return ['Debe ingresar una lista de comidas'];

        return [ 
            undefined, // mensaje de error
            new RegisterPurchaseDto(id_usuario, id_tipo_compra, id_tipo_pago,
                id_estado,id_sede, Number(costo_subtotal),Number(costo_total),Number(costo_delivery), lista_comidas) // creo la instancia usando el constructor privado recien
        ]
    }
}
