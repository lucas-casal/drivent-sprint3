import { Session, User } from '@prisma/client';
import { createUser } from './users-factory';
import * as jwt from 'jsonwebtoken';

import { prisma } from '@/config';
import { generateValidToken } from '../helpers';

export async function createSession(token: string): Promise<Session> {
  const user = await createUser();

  return prisma.session.create({
    data: {
      token: token,
      userId: user.id,
    },
  });
}
export async function createSessionWithUser(user: User): Promise<Session> {

  return prisma.session.create({
    data: {
      token: await generateValidToken(user),
      userId: user.id,
    },
  });
}