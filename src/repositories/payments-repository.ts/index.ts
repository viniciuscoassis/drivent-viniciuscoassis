import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function findUniqueByTicket(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId }
  });
}

async function insert(body: BodyToProcessPayment) {
  return prisma.payment.create({
    data: body
  });
}

const paymentRepository = {
  findUniqueByTicket, insert
};

export type BodyToProcessPayment = Omit<Payment, "id" | "createdAt" >

export default paymentRepository;
