import { prisma } from "@/config";

async function findUniqueByTicket(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId }
  });
}

const paymentRepository = {
  findUniqueByTicket
};

export default paymentRepository;
