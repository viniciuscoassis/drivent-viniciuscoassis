import { ticketTypeRepository, ticketsRepository, createTicket } from "@/repositories/tickets-repository.ts";

async function findAllTicketTypes() {
  const ticketTypes = await ticketTypeRepository.findMany();
  return ticketTypes;
}

async function findTicketFromUser(userId: number) {
  const userTickets = await ticketsRepository.findFromUserId(userId);
  return userTickets;
}

async function findTicketTypeFromId(typeId: number) {
  const ticketType = await ticketTypeRepository.findUnique(typeId);
  return ticketType;
}

async function insertNewTicket(body: createTicket) {
  const newTicket = await ticketsRepository.createNewTicket(body);
  return newTicket;
}

async function getTicketById(id: number) {
  const ticket = await ticketsRepository.findUniqueTicket(id);
  return ticket;
}

async function updateStatusToPaid(id: number) {
  await ticketsRepository.updateStatusToPaid(id);
}

const ticketService ={ 
  findTicketFromUser, insertNewTicket, getTicketById, updateStatusToPaid
  
};
const ticketTypeService = {
  findAllTicketTypes, findTicketTypeFromId
};
export  { ticketService, ticketTypeService };
