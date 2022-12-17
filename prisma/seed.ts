import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
const FAKER_SEED = 123;
faker.seed(FAKER_SEED);

const prisma = new PrismaClient();

async function main() {
  const users = [];
  for (let i = 0; i < 10; i++) {
    const name = faker.name.firstName();
    const user = await prisma.user.upsert({
      where: { id: name },
      update: {},
      create: {
        id: name.toLowerCase(),
        name: name,
        posts: {
          create: {
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(),
            published: true
          }
        }
      },
      include: { posts: true }
    });

    users.push(user);
  }

  console.log('Seeding database complete');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
