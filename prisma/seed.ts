import { animals, customers, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  console.log('Deleting existing data...');
  await prisma.$transaction([
    prisma.order_items.deleteMany(),
    prisma.orders.deleteMany(),
    prisma.animals.deleteMany(),
    prisma.customers.deleteMany(),
  ]);

  console.log('Resetting auto-increment sequence...');
  await prisma.$executeRaw`SELECT setval('users_id_seq', 1, false);`;
  await prisma.$executeRaw`SELECT setval('animals_id_seq', 1, false);`;
  await prisma.$executeRaw`SELECT setval('orders_id_seq', 1, false);`;

  console.log('Seeding database with new data...');

  console.log('Seeding animals...');
  const uniqueAnimals = new Set<string>();

  const animals = Array.from({ length: 44 }, () => {
    let name: string;
    do {
      name = faker.animal.type();
    } while (uniqueAnimals.has(name));
    uniqueAnimals.add(name);
    const price: number = parseFloat(
      faker.commerce.price({ min: 60, max: 200 }),
    );
    return {
      name: name,
      price,
    };
  });
  await prisma.animals.createMany({
    data: animals,
  });
  const animalRecords: animals[] = await prisma.animals.findMany();

  console.log('Seeding customers...');
  const customers = Array.from({ length: 500 }, () => {
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    return {
      first_name,
      last_name,
      email: faker.internet.email({
        firstName: first_name,
        lastName: last_name,
      }),
    };
  });

  await prisma.customers.createMany({
    data: customers,
  });

  const customerRecords = await prisma.customers.findMany();

  console.log('Seeding orders...');
  const orders: Array<{ customer_id: number; total: number }> = [];

  for (const customer of customerRecords) {
    const total: number = parseFloat(
      faker.commerce.price({ min: 60, max: 1000 }),
    );
    orders.push({
      customer_id: customer.id,
      total,
    });
  }

  while (orders.length < 1000) {
    const total: number = parseFloat(
      faker.commerce.price({ min: 60, max: 1000 }),
    );
    const randomCustomer: customers =
      faker.helpers.arrayElement(customerRecords);
    orders.push({
      customer_id: randomCustomer.id,
      total,
    });
  }

  await prisma.orders.createMany({ data: orders });

  const orderRecords = await prisma.orders.findMany();

  console.log('Seeding order_items...');
  const orderItems: Array<{
    order_id: number;
    animal_id: number;
    quantity: number;
  }> = [];

  for (const order of orderRecords) {
    const orderAnimalCount = faker.number.int({ min: 1, max: 5 });
    const selectedAnimals = faker.helpers.arrayElements(
      animalRecords,
      orderAnimalCount,
    );

    for (const animal of selectedAnimals) {
      orderItems.push({
        order_id: order.id,
        animal_id: animal.id,
        quantity: faker.number.int({ min: 1, max: 3 }),
      });
    }
  }

  await prisma.order_items.createMany({ data: orderItems });

  console.log('Seeding complete!');
  await prisma.$disconnect();
}

seed().catch(async (error) => {
  console.error('Seeding failed:', error);
  await prisma.$disconnect();
  process.exit(1);
});
