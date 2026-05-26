import { userModel } from './models/user.model.js'; 

class UserRepository {
    async getAll() {
        try {
            return await userModel.find();
        } catch (error) {
            throw new Error(`Error en el repositorio al obtener usuarios: ${error.message}`);
        }
    }

    async create(name, email) {
        try {
            return await userModel.create({ name, email });
        } catch (error) {
            throw new Error(`Error en el repositorio al crear usuario: ${error.message}`);
        }
    }
}

export const userRepository = new UserRepository();