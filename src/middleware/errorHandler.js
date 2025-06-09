import { StatusCodes } from 'http-status-codes';

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Erro de validação do Prisma
  if (err.code === 'P2002') {
    return res.status(StatusCodes.CONFLICT).json({
      error: 'Já existe um registro com este valor único'
    });
  }

  // Erro de registro não encontrado
  if (err.code === 'P2025') {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: 'Registro não encontrado'
    });
  }

  // Erro de validação
  if (err.name === 'ValidationError') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: err.message
    });
  }

  // Erro de autenticação
  if (err.name === 'UnauthorizedError') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: 'Não autorizado'
    });
  }

  // Erro interno do servidor
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: 'Erro interno do servidor'
  });
}; 