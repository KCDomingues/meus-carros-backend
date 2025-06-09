import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { StatusCodes } from 'http-status-codes';
import prisma from '../lib/prisma.js';

export const registro = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    });

    if (usuarioExistente) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Email já cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
      },
    });

    const { senha: _, ...usuarioSemSenha } = usuario;
    
    res.json(usuarioSemSenha);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Credenciais inválidas' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      env.jwt.secret,
      { expiresIn: env.jwt.expiresIn }
    );

    const { senha: _, ...usuarioSemSenha } = usuario;

    res.status(StatusCodes.OK).json({
      usuario: usuarioSemSenha,
      token
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
}; 