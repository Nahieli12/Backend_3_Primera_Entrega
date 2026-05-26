import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mocking.js';

import { userModel } from '../persistence/models/user.model.js';
import petModel from '../persistence/models/pet.model.js';

const router = Router();

// Endpoint: GET /api/mocks/mockingpets
router.get('/mockingpets', (req, res) => {
    const pets = [
        { name: "Bobby", specie: "Dog" },
        { name: "Garfield", specie: "Cat" }
    ];
    res.status(200).json({ status: "success", payload: pets });
});

// Endpoint: GET /api/mocks/mockingusers
router.get('/mockingusers', (req, res) => {
    
    const { users } = req.query;
    
    
    const quantity = users ? parseInt(users, 10) : undefined;
    
    
    const mockUsers = generateMockUsers(quantity);
    
    res.status(200).json({ status: "success", payload: mockUsers });
});

// Endpoint: POST /api/mocks/generateData
router.post('/generateData', async (req, res) => {
    try {
        const { users, pets } = req.body;

        if (!users || !pets || isNaN(users) || isNaN(pets)) {
            return res.status(400).json({ status: "error", error: "Faltan los campos numéricos 'users' y 'pets' en el body" });
        }

        const mockUsers = generateMockUsers(parseInt(users, 10));
        const mockPets = generateMockPets(parseInt(pets, 10));

        
        const insertedUsers = await userModel.insertMany(mockUsers);
        const insertedPets = await petModel.insertMany(mockPets);

        res.status(200).json({
            status: "success",
            message: `Se insertaron los datos correctamente en la base de datos perrito.`,
            payload: {
                usuariosInsertados: insertedUsers.length,
                mascotasInsertadas: insertedPets.length
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "Error interno al insertar los datos falsos" });
    }
});

export default router;