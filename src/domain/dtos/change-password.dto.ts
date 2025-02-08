export class ChangePasswordDto {
    constructor(
        public id_usuario: number,
        public clave_actual: string,
        public clave_nueva: string
    ) {}

    static create(object: { [key: string]: any }): [string?, ChangePasswordDto?] {
        const { id_usuario, clave_actual, clave_nueva } = object;

        if (!id_usuario) return ['El ID del usuario es requerido'];
        if (!clave_actual) return ['Ingrese la contraseña actual'];
        if (!clave_nueva) return ['Ingrese la nueva contraseña'];

        return [undefined, new ChangePasswordDto(id_usuario, clave_actual, clave_nueva)];
    }
}
