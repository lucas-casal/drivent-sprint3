import app from "@/app";
import { createEnrollmentWithAddress, createSession, createSessionWithUser, createUser } from "../factories";
import supertest from "supertest";

describe('teste de busca de hotel', () => {

    it('should return the hotel object when registred', async () => {
        const user = await createUser()
        const session = await createSessionWithUser(user)
        const result = await supertest(app).get('/hotels').set('Authorization', session.token)
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