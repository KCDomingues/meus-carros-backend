import { StatusCodes } from 'http-status-codes';
import prisma from '../lib/prisma.js';

export const criarCarro = async (req, res) => {
  const { marca, modelo, ano, placa } = req.body;
  const carro = await prisma.carro.create({
    data: {
      marca,
      modelo,
      ano,
      placa,
      usuarioId: req.userId,
    },
  });
  res.status(StatusCodes.CREATED).json(carro);
};

export const listarCarros = async (req, res) => {
  const carros = await prisma.carro.findMany({
    where: {
      usuarioId: req.userId
    },
    include: {
      usuario: {
        select: {
          id: true,
          nome: true,
          email: true
        }
      }
    }
  });
  res.status(StatusCodes.OK).json(carros);
};

export const getCarro = async (req, res) => {
  const { id } = req.params;
  const carro = await prisma.carro.findUnique({
    where: { id },
    include: {
      usuario: {
        select: {
          id: true,
          nome: true,
          email: true
        }
      }
    }
  });

  if (!carro) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Carro não encontrado' });
  }

  if (carro.usuarioId !== req.userId) {
    return res.status(StatusCodes.FORBIDDEN).json({ error: 'Acesso negado' });
  }

  res.status(StatusCodes.OK).json(carro);
};

export const atualizarCarro = async (req, res) => {
  const { id } = req.params;
  const { marca, modelo, ano, placa } = req.body;

  const carroExistente = await prisma.carro.findUnique({
    where: { id }
  });

  if (!carroExistente) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Carro não encontrado' });
  }

  if (carroExistente.usuarioId !== req.userId) {
    return res.status(StatusCodes.FORBIDDEN).json({ error: 'Acesso negado' });
  }

  const carro = await prisma.carro.update({
    where: { id },
    data: {
      marca,
      modelo,
      ano,
      placa
    }
  });

  res.status(StatusCodes.OK).json(carro);
};

export const deletarCarro = async (req, res) => {
  const { id } = req.params;

  const carroExistente = await prisma.carro.findUnique({
    where: { id }
  });

  if (!carroExistente) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Carro não encontrado' });
  }

  if (carroExistente.usuarioId !== req.userId) {
    return res.status(StatusCodes.FORBIDDEN).json({ error: 'Acesso negado' });
  }

  await prisma.carro.delete({
    where: { id }
  });

  res.status(StatusCodes.NO_CONTENT).send();
}; 