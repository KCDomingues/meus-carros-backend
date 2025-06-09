import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { StatusCodes } from 'http-status-codes';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token não fornecido' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token mal formatado' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token mal formatado' });
  }

  jwt.verify(token, env.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token inválido' });
    }

    req.userId = decoded.id;
    return next();
  });
}; 