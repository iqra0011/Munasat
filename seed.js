const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');
  await prisma.globalStat.upsert({
    where: { id: 'seed_1' },
    update: {},
    create: {
      id: 'seed_1',
      activeTenders: 1100,
      totalAwardValue: 41000000000,
      activeVendors: 2500
    }
  });
  console.log('Seed complete.');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
