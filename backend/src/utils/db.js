const { PrismaClient } = require('@prisma/client');

// Create a Prisma client instance
const prisma = new PrismaClient({
    log: ['query']
});

module.exports = prisma;
