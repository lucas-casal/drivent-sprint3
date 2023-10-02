import { AuthenticatedRequest } from "@/middlewares";
import { Response } from 'express';
import { hotelService } from "@/services";
import httpStatus from "http-status";


async function getAll (req: AuthenticatedRequest, res: Response){
    const {userId} = req
    const result = await hotelService.get(userId)

    res.status(httpStatus.OK).send(result)
} 

async function getRooms (req: AuthenticatedRequest, res: Response){
    const {userId} = req
    const {hotelId} = req.params
    const result = await hotelService.getRooms(userId, Number(hotelId))

    res.status(httpStatus.OK).send(result)
} 

export const hotelController = {
    getAll,
    getRooms
}