import UserModel from '#Schemas/user.schema.js';
import { hash } from 'bcrypt';

const userRegisterController = async (req, res) => {
    const { _id, name, surname, email, password } = req.body;

    // Comprobamos en la db si ya existe un usuario con el mismo id que otro usuario
    const existingUserById = await UserModel.findById(_id).exec();
    if (existingUserById) return res.status(409).send("Ya existe un usuario con ese id registrado");

    // Comprobamos en la db si ya existe un usuario con el mismo email que otro usuario
    const existingUserByEmail = await UserModel.findOne({ email }).exec();
    if (existingUserByEmail) return res.status(409).send("Ya existe un usuario con ese email registrado");

    // Hasheamos el password para no guardar en texto plano de la pass en la bd
    const hashedPassword = await hash(password, 12);
    // Aqui se instancia el nuevo usuario
    const user = new UserModel({
        _id,
        name,
        surname,
        email,
        password: hashedPassword
    });

    await user.save();

    return res.status(201).send("Usuario registrado con éxito")

};

export default userRegisterController;
