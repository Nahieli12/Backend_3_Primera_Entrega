import { createHash } from './hash.js';
import mongoose from 'mongoose';

export const generateMockUsers = (numUsers = 50) => {
    const users = [];
    const roles = ['user', 'admin'];

    
    const hashedPassword = createHash('coder123');

    for (let i = 0; i < numUsers; i++) {
        users.push({
            _id: new mongoose.Types.ObjectId(), 
            name: `UsuarioFalso ${i + 1}`,      
            email: `usuariofalso${i + 1}@coder.com`,
            password: hashedPassword,           
            role: roles[Math.floor(Math.random() * roles.length)], 
            pets: []                            
        });
    }

    return users;
};

export const generateMockPets = (numPets = 0) => {
    const pets = [];
    const species = ['Dog', 'Cat', 'Bird', 'Rabbit'];

    for (let i = 0; i < numPets; i++) {
        pets.push({
            name: `MascotaFalsa${i + 1}`,
            specie: species[Math.floor(Math.random() * species.length)],
            adopted: false
        });
    }
    return pets;
};