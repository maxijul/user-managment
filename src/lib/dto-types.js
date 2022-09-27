import { Type } from "@sinclair/typebox";

export const idDTOSchema = Type.String({
   format: 'uuid',
   errorMessage: {
       type: 'El tipo de _id no es valido, debe ser un string',
       format: 'El formato de _id no es valido, debe ser un uuid4',
   },
});

export const nameDTOSchema = Type.String({
   minLength: 2,
   maxLength: 20,
   errorMessage: {
       minLength: 'El nombre debe tener al menos 2 caracteres de longitud',
       maxLength: 'El nombre debe tener maximo 20 caracteres de longitud',
   },
});

export const surnameDTOSchema = Type.String({
   minLength: 4,
   maxLength: 50,
   errorMessage: {
       minLength:
           'El apellido debe tener al menos 4 caracteres de longitud',
       maxLength:
           'El apellido debe tener maximo 50 caracteres de longitud',
   },
});

export const emailDTOSchema = Type.String({
   format: 'email',
   errorMessage: {
       type: 'El tipo de email no es valido, debe ser un string',
       format: 'El formato de email no es valido, debe cumplir RFC 5322',
   },
});

export const passwordTOSchema = Type.String({
   format: 'password',
   minLength: 10,
   maxLength: 25,
   errorMessage: {
       type: 'El tipo de la contraseña no es valido, debe ser un string',
       format: 'El formato de la contraseña no es valido, debe contener una mayuscula, minuscula y un numero',
       minLength: 'Debe contener minimo 10 caracteres',
       maxLength: 'Debe contener maximo 25 caracteres',
   },
});

export const additionalProperties = {
    additionalProperties: false,
    errorMessage: {
        additionalProperties: "El formato del objeto no es valido."
    }
}