import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  console.log('Deleting existing data...');
  await prisma.$transaction([prisma.users.deleteMany()]);

  console.log('Resetting auto-increment sequence...');
  await prisma.$executeRaw`SELECT setval('users_id_seq', 1, false);`;

  console.log('Seeding database with new data...');

  const users = Array.from({ length: 10 }, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }),
      jobTitle: faker.person.jobTitle(),
      vehicle: faker.vehicle.vehicle(),
      favoriteAnimal: faker.animal.type(),
    };
  });

  await prisma.users.createMany({
    data: users,
  });

  console.log('Seeding complete!');
  await prisma.$disconnect();
}

seed().catch(async (error) => {
  console.error('Seeding failed:', error);
  await prisma.$disconnect();
  process.exit(1);
});
