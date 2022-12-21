import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const FAKER_SEED = 123;
faker.seed(FAKER_SEED);

const prisma = new PrismaClient();

async function main() {
  const authors = [];
  for (let i = 0; i < 10; i++) {
    const name = faker.name.firstName();
    const author = await prisma.author.upsert({
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

    authors.push(author);
  }

  console.log("Seeding database complete");
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
