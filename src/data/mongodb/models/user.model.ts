import mongoose, {Schema} from "mongoose";

// el esquema define las reglas de como va a trabajar el modelo
const userSchema = new Schema({
    nombres:{
        type: String,
        required: [true, 'El nombre es obligatorio'] // podemos pasar solo true, pero tmb nos permite pasar un mensaje de error
    },
    apellidos:{
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    celular:{
        type: String, // Number
        required: [true, 'El celular es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true // el correo no debe repetirse
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    // name:{
    //     type:String,
    //     // es requerido y el mensaje de error que aparece sino se cumple la condición.
    //     required: [true, 'Name is required']
    // },
    // email:{
    //     type: String,
    //     required: [true, 'Email is required'],
    //     unique: true // no deben haber correos duplicados
    // },
    // password:{
    //     type: String,
    //     required: [true, 'Password is required'],
    // },
    // img:{
    //     type: String,
    // },
    // role:{
    //     type: [String], // aregglo de strings, recordar que esto es la definición del modelo, no es como tal typescript
    //     required: [true, 'Password is required'],
    //     default:['USER_ROLE'], // valor por defecto, arreglo con el rol de USER_ROLE
    //     enum:['USER_ROLE','ADMIN_ROLE'], // los valores posibles
    // },
})

// Creamos nuestro modelo
// User es el nombre de la colleccion en la base datos
// userSchema es el esquema del que se basará el modelo (Esquema es como una clase y el modelo es como un Objeto)
export const UserModel = mongoose.model('User', userSchema)
