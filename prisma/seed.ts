import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: {
      id: '6da25c00-5829-401e-a81d-dcded7baf8c9',
      email: 'nguyenhaminhtuan1997@gmail.com',
      fullName: 'Nguyễn Hà Minh Tuấn',
    },
    skipDuplicates: true,
  });
  await prisma.topic.createMany({
    data: [{ name: 'Du lịch' }, { name: 'Tiền ảo' }, { name: 'Âm nhạc' }],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
