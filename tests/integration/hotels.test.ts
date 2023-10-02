import app from "@/app";
import { createEnrollmentWithAddress, createSessionWithUser, createTicket, createTicketType, createTicketTypeFuncional, createUser } from "../factories";
import supertest from "supertest";

describe('teste de busca de hotel', () => {

    it('should return the hotel object when registred', async () => {
        const user = await createUser()
        const enrollment = await createEnrollmentWithAddress(user)
        const ticketType = await createTicketTypeFuncional()
        const session = await createSessionWithUser(user)
        const ticket = await createTicket(enrollment.id, ticketType.id, 'PAID' )
        const result = await supertest(app).get('/hotels').set('Authorization', 'Bearer ' + session.token)
        console.log(result.body)

        expect(result.status).toBe(200)
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining(
                    {
                        id: expect.any(Number),
                        name: expect.any(String),
                        image: expect.any(String),
                        createdAt: expect.any(Date),
                        updatedAt: expect.any(Date)
                    }
                )
            
        ]))
    });
    
})