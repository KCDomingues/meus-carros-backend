import { StatusCodes } from 'http-status-codes';
import prisma from '../lib/prisma.js';

export const getMe = async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.userId },
      include: {
        carros: true,
      },
    });

    if (!usuario) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Usuário não encontrado' });
    }

    const { senha: _, ...usuarioSemSenha } = usuario;
    res.status(StatusCodes.OK).json(usuarioSemSenha);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
}; 