import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.globalStat.deleteMany()
  await prisma.vendor.deleteMany()
  await prisma.tender.deleteMany()
  await prisma.project.deleteMany()
  await prisma.award.deleteMany()

  // Seeding Global Stats
  await prisma.globalStat.create({
    data: {
      activeTenders: 1100, // 1.1K
      totalAwardValue: 41000000000, // SAR 41B
      activeVendors: 2500, // 2.5K
    },
  })

  // Seeding Vendors
  const elm = await prisma.vendor.create({
    data: {
      name: "Elm Company",
      totalWon: 4800000000,
      winRate: 78.0,
      totalAwards: 120, // dummy logic
      localContent: 65.0, // dummy logic
      topMinistries: "Ministry of Interior, Ministry of Health",
    },
  })

  await prisma.vendor.create({
    data: {
      name: "STC Solutions",
      totalWon: 3500000000,
      winRate: 65.0,
      totalAwards: 95,
      localContent: 70.0,
      topMinistries: "Ministry of Communications, Ministry of Defense",
    },
  })

  await prisma.vendor.create({
    data: {
      name: "Saudi Information Tech",
      totalWon: 2100000000,
      winRate: 60.0,
      totalAwards: 50,
      localContent: 80.0,
      topMinistries: "PIF, Ministry of Health",
    },
  })

  // Seeding Tenders
  await prisma.tender.create({
    data: {
      title: "Digital Infrastructure Phase II - The Line",
      ministry: "NEOM",
      budget: 2400000000,
      deadline: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), // In 14 days
      status: "Closing Soon",
      category: "IT & Telecommunications",
    },
  })

  await prisma.tender.create({
    data: {
      title: "Sustainable Water Management",
      ministry: "Ministry of Environment, Water and Agriculture",
      budget: 450000000,
      deadline: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      status: "Open",
      category: "Construction & Utilities",
    },
  })

  // Seeding Projects
  await prisma.project.create({
    data: {
      name: "NEOM",
      totalBudget: 1900000000000, // 1.9T
      spentToDate: 350000000000,
      activeSubProjects: 145,
      progressPercent: 18.5,
    },
  })

  await prisma.project.create({
    data: {
      name: "Red Sea Global",
      totalBudget: 80000000000,
      spentToDate: 25000000000,
      activeSubProjects: 45,
      progressPercent: 35.0,
    },
  })
  
  await prisma.project.create({
    data: {
      name: "Qiddiya",
      totalBudget: 40000000000,
      spentToDate: 12000000000,
      activeSubProjects: 28,
      progressPercent: 22.0,
    },
  })

  await prisma.project.create({
    data: {
      name: "Diriyah Gate",
      totalBudget: 60000000000,
      spentToDate: 15000000000,
      activeSubProjects: 36,
      progressPercent: 25.0,
    },
  })

  // Add dummy award to populate award metrics
  await prisma.award.create({
    data: {
      title: "e-Government Services Expansion",
      vendorId: elm.id,
      ministry: "Ministry of Interior",
      amount: 1500000000,
      startDate: new Date(),
    }
  })

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
