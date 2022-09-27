import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import {
    additionalProperties,
    nameDTOSchema,
    surnameDTOSchema,
} from '#Lib/dto-types.js';

const UpdateDataDTOSchema = Type.Object(
    {
        name: nameDTOSchema,
        surname: surnameDTOSchema,
    },
    additionalProperties
);

// Instanciar ajv
const ajv = new Ajv({ allErrors: true });
addErrors(ajv);

// Sentencia donde ya podemos ejecutar la funcion como middleware
const validateSchema = ajv.compile(UpdateDataDTOSchema);

const userUpdateDataDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);

    if (!isDTOValid)
        return res.status(400).send({
            errors: validateSchema.errors.map((error) => error.message),
        });
    // .send(ajv.errorsText(validateSchema.errors, { separator: '\n' }));

    next();
};

export default userUpdateDataDTO;
