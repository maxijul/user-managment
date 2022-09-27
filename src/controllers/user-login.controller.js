import UserModel from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';
import { SignJWT } from 'jose';

const userLoginController = async (req, res) => {
    const { email, password } = req.body;

    // Comprobamos si el mail existe en la db
    const existingUserByEmail = await UserModel.findOne({ email }).exec();
    if (!existingUserByEmail)
        return res.status(401).send('Credenciales incorrectas');

    // Comprobamos si el password coincide con el email
    const checkPassword = await compare(password, existingUserByEmail.password);
    if (!checkPassword) return res.status(401).send('Credenciales incorrectas');
    // Generamos el json web token
    // Aqui generamos el payload
    const jwtConstructor = new SignJWT({ id: existingUserByEmail._id });

    const encoder = new TextEncoder();
    // Aqui generamos la firma consolidando el json web token
    const jwt = await jwtConstructor
        .setProtectedHeader({
            alg: 'HS256',
            typ: 'JWT',
        })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    return res.send({ jwt })
};

export default userLoginController;
