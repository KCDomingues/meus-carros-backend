import bcrypt from 'bcrypt';
import prisma from '../src/lib/prisma.js';

async function main() {
  // Criar usuário de teste
  const hashedPassword = await bcrypt.hash('123456', 10);
  
  const usuario = await prisma.usuario.upsert({
    where: { email: 'teste@email.com' },
    update: {},
    create: {
      nome: 'Usuário Teste',
      email: 'teste@email.com',
      senha: hashedPassword,
    },
  });

  console.log('Usuário de teste criado:', usuario);

  // Criar alguns carros de teste
  const carros = await Promise.all([
    prisma.carro.create({
      data: {
        marca: 'Toyota',
        modelo: 'Corolla',
        ano: 2022,
        placa: 'ABC1234',
        usuarioId: usuario.id,
      },
    }),
    prisma.carro.create({
      data: {
        marca: 'Honda',
        modelo: 'Civic',
        ano: 2023,
        placa: 'XYZ5678',
        usuarioId: usuario.id,
      },
    }),
  ]);

  console.log('Carros de teste criados:', carros);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 