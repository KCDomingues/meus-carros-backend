import express from 'express';
import {
    atualizarCarro,
    criarCarro,
    deletarCarro,
    getCarro,
    listarCarros
} from '../controllers/carroController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /carros:
 *   post:
 *     summary: Cria um novo carro
 *     tags: [Carros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - marca
 *               - modelo
 *               - ano
 *               - placa
 *             properties:
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               ano:
 *                 type: integer
 *               placa:
 *                 type: string
 *     responses:
 *       200:
 *         description: Carro criado com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post('/', authMiddleware, criarCarro);

/**
 * @swagger
 * /carros:
 *   get:
 *     summary: Lista todos os carros do usuário
 *     tags: [Carros]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de carros obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   marca:
 *                     type: string
 *                   modelo:
 *                     type: string
 *                   ano:
 *                     type: integer
 *                   placa:
 *                     type: string
 *                   usuario:
 *                     type: object
 *       401:
 *         description: Não autorizado
 */
router.get('/', authMiddleware, listarCarros);

/**
 * @swagger
 * /carros/{id}:
 *   get:
 *     summary: Obtém um carro específico
 *     tags: [Carros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Carro obtido com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Carro não encontrado
 */
router.get('/:id', authMiddleware, getCarro);

/**
 * @swagger
 * /carros/{id}:
 *   put:
 *     summary: Atualiza um carro
 *     tags: [Carros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - marca
 *               - modelo
 *               - ano
 *               - placa
 *             properties:
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               ano:
 *                 type: integer
 *               placa:
 *                 type: string
 *     responses:
 *       200:
 *         description: Carro atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Carro não encontrado
 */
router.put('/:id', authMiddleware, atualizarCarro);

/**
 * @swagger
 * /carros/{id}:
 *   delete:
 *     summary: Remove um carro
 *     tags: [Carros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Carro removido com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Carro não encontrado
 */
router.delete('/:id', authMiddleware, deletarCarro);

export default router; 