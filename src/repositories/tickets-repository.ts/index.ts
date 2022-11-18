import { prisma } from "@/config";

async function findMany() {
  return prisma.ticketType.findMany();
}

async function findUnique(typeId: number) {
  return prisma.ticketType.findUnique({
    where: { id: typeId }
  });
}

async function findFromUserId(userId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId: userId }
  });
}

const ticketTypeRepository = {
  findMany, findUnique
};

const ticketsRepository = {
  findFromUserId
};
export { ticketsRepository, ticketTypeRepository };
