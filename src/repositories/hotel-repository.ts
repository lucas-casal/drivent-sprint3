import { prisma } from '@/config';

async function get() {
  return await prisma.hotel.findMany();
}

async function getOneWithRooms(id: number){
  console.log(id)
  return await prisma.hotel.findFirst({
  where:{id},
  include: {
    Rooms: true
  }

  })
}

export const hotelRepository = {
  get,
  getOneWithRooms
};
