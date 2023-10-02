import { notFoundError } from "@/errors";
import { paymentRequiredError } from "@/errors/payment-required-error";
import { enrollmentRepository, ticketsRepository } from "@/repositories";
import { hotelRepository } from "@/repositories/hotel-repository";

async function get (id: number){
    const enrollment = await enrollmentRepository.findByUserId(id)

    if (!enrollment) throw notFoundError();
    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id)

    if (!ticket) throw notFoundError();

    if (ticket.status !== "PAID" || ticket.TicketType.includesHotel === false || ticket.TicketType.isRemote === true) throw paymentRequiredError()

    const hotels = await hotelRepository.get()
    if (!hotels) throw notFoundError()

    return hotels
}


async function getRooms (userId: number, hotelId: number){
    const enrollment = await enrollmentRepository.findByUserId(userId)
    if (!enrollment) throw notFoundError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id)
    console.log(ticket)
    if (!ticket) throw notFoundError();
    if (ticket.status !== "PAID" || ticket.TicketType.includesHotel === false || ticket.TicketType.isRemote === true) throw paymentRequiredError()

    const rooms = await hotelRepository.getOneWithRooms(hotelId)
    if (!rooms) throw notFoundError()

    return rooms
}

export const hotelService = {
    get,
    getRooms
}