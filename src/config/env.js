import dotenv from 'dotenv';

dotenv.config();

export const env = {
  // Server Configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database Configuration
  database: {
    url: process.env.DATABASE_URL || 'postgres://postgres.cltuyefkcosoksqjtyyk:zdOGVlYpoiA25pWI@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true',
    directUrl: process.env.DIRECT_URL || 'postgres://postgres.cltuyefkcosoksqjtyyk:zdOGVlYpoiA25pWI@aws-0-sa-east-1.pooler.supabase.com:5432/postgres',
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'sua-chave-secreta-aqui',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },

  // CORS Configuration
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
  },

  // Security
  security: {
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10),
  },
}; 