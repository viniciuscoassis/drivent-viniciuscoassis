import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import { ticketTypeService, ticketService } from "@/services/tickets-service.ts";
import { Response } from "express";
import httpStatus from "http-status";

async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  const ticketTypes = await ticketTypeService.findAllTicketTypes();
  if (!ticketTypes) return res.send([]);
  return res.status(httpStatus.OK).send(ticketTypes);
}

async function getTickets(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const enrollCheck = await enrollmentsService.getEnrollmentByUserId(userId);
   
    if (!enrollCheck) return res.sendStatus(httpStatus.NOT_FOUND);

    const ticketFromUser = await ticketService.findTicketFromUser(enrollCheck.id);
    console.log(ticketFromUser);
    if (!ticketFromUser) return res.sendStatus(httpStatus.NOT_FOUND);

    const typeId = ticketFromUser.ticketTypeId;
    const ticketType = await ticketTypeService.findTicketTypeFromId(typeId);

    const tickets = {
      ...ticketFromUser,
      TicketType: ticketType,
    };

    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export { getTicketTypes, getTickets };
