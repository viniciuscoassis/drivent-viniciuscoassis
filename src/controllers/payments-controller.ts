import { AuthenticatedRequest } from "@/middlewares";
import { BodyPayment } from "@/protocols";
import enrollmentsService from "@/services/enrollments-service";
import paymentsService from "@/services/payments-service";
import { ticketService, ticketTypeService } from "@/services/tickets-service.ts";
import { Response } from "express";
import httpStatus from "http-status";

async function getPaymentByTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  if(!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

  const checkTicket = await ticketService.getTicketById(Number(ticketId));
  if(!checkTicket) return res.sendStatus(httpStatus.NOT_FOUND);

  const enrollment = await enrollmentsService.getEnrollmentByUserId(req.userId);
  if(!enrollment) return res.sendStatus(httpStatus.BAD_REQUEST);

  if(checkTicket.enrollmentId != enrollment.id) return res.sendStatus(httpStatus.UNAUTHORIZED);
  const payment = await paymentsService.findPaymentWithTicket(Number(ticketId));

  return res.status(httpStatus.OK).send(payment);
}

async function processPayment(req: AuthenticatedRequest, res: Response) {
  const body = req.body as BodyPayment;

  if(!body.ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);
  if(!body.cardData) return res.sendStatus(httpStatus.BAD_REQUEST);

  const checkTicket = await ticketService.getTicketById(Number(body.ticketId));
  if(!checkTicket) return res.sendStatus(httpStatus.NOT_FOUND);

  const enrollment = await enrollmentsService.getEnrollmentByUserId(req.userId);
  if(!enrollment) return res.sendStatus(httpStatus.BAD_REQUEST);

  if(checkTicket.enrollmentId != enrollment.id) return res.sendStatus(httpStatus.UNAUTHORIZED);

  const ticketType = await ticketTypeService.findTicketTypeFromId(checkTicket.ticketTypeId);

  const lastDigits = body.cardData.number.toString().slice(-4);
  const paymentProcessed = await paymentsService.processPayment({ ticketId: body.ticketId, value: ticketType.price, cardIssuer: body.cardData.issuer, cardLastDigits: lastDigits, updatedAt: new Date() });

  await ticketService.updateStatusToPaid(checkTicket.id);

  return res.status(httpStatus.OK).send(paymentProcessed);
}

export { getPaymentByTicket, processPayment };
