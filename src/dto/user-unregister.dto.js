import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import { additionalProperties, passwordTOSchema } from '#Lib/dto-types.js';

const UnregisterDTOSchema = Type.Object(
    {
        password: passwordTOSchema,
    },
    additionalProperties
);

// Instanciar ajv
const ajv = new Ajv({ allErrors: true });
// añadir un formato custom
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);

addErrors(ajv);

// Sentencia donde ya podemos ejecutar la funcion como middleware
const validateSchema = ajv.compile(UnregisterDTOSchema);

const userUnregisterdDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);

    if (!isDTOValid)
        return res.status(400).send({
            errors: validateSchema.errors.map((error) => error.message),
        });
    // .send(ajv.errorsText(validateSchema.errors, { separator: '\n' }));

    next();
};

export default userUnregisterdDTO;
