import { jwtVerify } from 'jose';

const userJWTDTO = async (req, res, next) => {
    // Sirve para sacar el header de authorization donde viene el token
    const { authorization } = req.headers;

    if (!authorization)
        return res.status(401).send('Usuario no autorizado');

    // Sirve para verificar si el token viene en la cabecera
    const jwt = authorization.split(' ')[1]
    if(!jwt) return res.status(401).send('Usuario no autorizado');

    try {
        // sirve para formatear un string que me pide la funcion jwtVerify en la clave
        const encoder = new TextEncoder();
        // primero va cabecera y despues la clave
        // payload contiene el identificador del usuario
        const { payload } = await jwtVerify(
            jwt,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );

        // metemos dentro del objeto req el id que viene dentro del payload
        req.id = payload.id

        next();
    } catch (error) {
        return res.status(401).send('Usuario no autorizado');
    }
};

export default userJWTDTO;
