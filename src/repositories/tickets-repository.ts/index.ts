import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

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

async function createNewTicket(body: createTicket) {
  return prisma.ticket.create({
    data: body
  });
}

async function findUniqueTicket(id: id) {
  return prisma.ticket.findUnique({
    where: { id: id }
  });
}

export type createTicket = Omit<Ticket, "id" | "createdAt" >;

const ticketTypeRepository = {
  findMany, findUnique
};

const ticketsRepository = {
  findFromUserId, createNewTicket, findUniqueTicket
};
export { ticketsRepository, ticketTypeRepository };
