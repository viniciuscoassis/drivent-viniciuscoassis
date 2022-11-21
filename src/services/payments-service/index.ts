import paymentRepository, { BodyToProcessPayment } from "@/repositories/payments-repository.ts";

async function findPaymentWithTicket(ticketId: number) {
  const payment = await paymentRepository.findUniqueByTicket(ticketId);
  return payment;
}

async function processPayment(body: BodyToProcessPayment ) {
  const paymentProcessed = await paymentRepository.insert(body);
  return paymentProcessed;
}

const paymentsService ={ 
  findPaymentWithTicket, processPayment
};

export default paymentsService;
