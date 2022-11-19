import paymentRepository from "@/repositories/paymenys-repository.ts";

async function findPaymentWithTicket(ticketId: number) {
  const payment = await paymentRepository.findUniqueByTicket(ticketId);
  return payment;
}

const paymentsService ={ 
  findPaymentWithTicket
};

export default paymentsService;
