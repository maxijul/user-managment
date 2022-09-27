import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import {
    additionalProperties,
    emailDTOSchema,
    passwordTOSchema,
} from '#Lib/dto-types.js';

const LoginDTOSchema = Type.Object(
    {
        email: emailDTOSchema,
        password: passwordTOSchema,
    },
    additionalProperties
);

// Instanciar ajv
const ajv = new Ajv({ allErrors: true });
// añadir un formato custom
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);

addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

// Sentencia donde ya podemos ejecutar la funcion como middleware
const validateSchema = ajv.compile(LoginDTOSchema);

const userLoginDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);

    if (!isDTOValid)
        return res.status(400).send({
            errors: validateSchema.errors.map((error) => error.message),
        });
    // .send(ajv.errorsText(validateSchema.errors, { separator: '\n' }));

    next();
};

export default userLoginDTO;
