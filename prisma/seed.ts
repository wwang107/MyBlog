import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const category = await prisma.category.create({
        data: { name: 'category1' }
    });

    const alice = await prisma.user.upsert({
        where: { id: 'alice' },
        update: {},
        create: {
            id: 'alice',
            name: 'Alice',
            posts: {
                create: {
                    title: 'This a test title from alice',
                    content: 'https://www.prisma.io/nextjs',
                    published: true,
                },
            },
        },
    });

    const bob = await prisma.user.upsert({
        where: { id: 'bob' },
        update: {},
        create: {
            id: 'bob',
            name: 'Bob',
            posts: {
                create: {
                    title: 'This a test title from bob',
                    content: 'This is a test content from bon',
                    published: true,
                    categoryName: category.name
                },
            },
        },
    });


    const tag = await prisma.tag.create({
        data: {
            name: "tag1"
        }
    })

    console.log({ alice });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });