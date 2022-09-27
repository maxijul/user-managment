import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import {
    additionalProperties,
    emailDTOSchema,
    idDTOSchema,
    nameDTOSchema,
    passwordTOSchema,
    surnameDTOSchema,
} from '#Lib/dto-types.js';

const RegisterDTOSchema = Type.Object(
    {
        _id: idDTOSchema,
        name: nameDTOSchema,
        surname: surnameDTOSchema,
        email: emailDTOSchema,
        password: passwordTOSchema,
    },
    additionalProperties
);

// Instanciar ajv
const ajv = new Ajv({ allErrors: true });
// añadir un formato custom
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);

addFormats(ajv, ['email', 'uuid']).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

// Sentencia donde ya podemos ejecutar la funcion como middleware
const validateSchema = ajv.compile(RegisterDTOSchema);

const userRegisterDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);

    if (!isDTOValid)
        return res.status(400).send({
            errors: validateSchema.errors.map((error) => error.message),
        });
    // .send(ajv.errorsText(validateSchema.errors, { separator: '\n' }));

    next();
};

export default userRegisterDTO;
