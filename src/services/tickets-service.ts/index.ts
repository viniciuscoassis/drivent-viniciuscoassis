import { ticketTypeRepository, ticketsRepository } from "@/repositories/tickets-repository.ts";

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
const ticketService ={ 
  findTicketFromUser
};
const ticketTypeService = {
  findAllTicketTypes, findTicketTypeFromId
};
export  { ticketService, ticketTypeService };
