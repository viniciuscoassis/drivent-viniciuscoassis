import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import paymentsService from "@/services/payments-service";
import { ticketService } from "@/services/tickets-service.ts";
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

export { getPaymentByTicket };
