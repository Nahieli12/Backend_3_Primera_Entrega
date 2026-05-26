import express from 'express'
import { config } from './config/commander.js'
import { env } from './config/env.js'
import { connectDB } from './config/db.js'
import userRoutes from './routes/user.routes.js'
import { showProcessInfo } from './utils/processInfo.js'
import sumRoutes from "./routes/sum.routes.js"
import mocksRouter from './routes/mocks.router.js';

const app = express()


//middlewares
app.use(express.json())

//rutas
app.use('/api/users', userRoutes)

app.use('/api/sum', sumRoutes)

app.use('/api/mocks', mocksRouter);


//puerto
const PORT = env.port || config.port

if (!PORT) {
    console.error("Puerto inválido");
    process.exit(1);
}

//init
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
    console.log("Ambiente de ejecución:", config.mode);
    console.log("CONFIG:", config);
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
    }
};

startServer();
