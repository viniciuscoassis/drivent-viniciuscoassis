import { notFoundError } from "@/errors";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

async function getPaymentByTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  if(!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);
}

export { getPaymentByTicket };
