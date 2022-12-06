import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto';
const prisma = new PrismaClient()

async function main() {
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

    const commentId = randomUUID();

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
                    comments: {
                        connectOrCreate: {
                            create: {
                                id: commentId,
                                comment: 'comment 1'
                            },
                            where: {
                                id: commentId
                            }
                        }
                    },
                    category: {
                        connectOrCreate: {
                            create: {
                                name: 'category1'
                            },
                            where: {
                                name: 'category1'
                            }
                        }
                    },
                    tags: {
                        connectOrCreate: {
                            create: {
                                name: 'tag1'
                            },
                            where: {
                                name: 'tag1'
                            }
                        }
                    }
                }
            },
        }
    });

    console.log('Seeding database complete', { alice, bob });
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