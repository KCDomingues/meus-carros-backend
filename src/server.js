import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env.js';
import { specs } from './config/swagger.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import carRoutes from './routes/carros.js';
import userRoutes from './routes/usuarios.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas
app.use('/auth', authRoutes);
app.use('/usuarios', userRoutes);
app.use('/carros', carRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API Meus Carros funcionando!' });
});

// Middleware de erro (deve ser o último)
app.use(errorHandler);

// Iniciar servidor
app.listen(env.port, () => {
  console.log(`Servidor rodando na porta ${env.port}`);
  console.log(`Documentação disponível em http://localhost:${env.port}/api-docs`);
});