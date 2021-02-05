import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

declare global {
  export interface Context {
    req: Request;
    res: Response;
    prisma: PrismaClient;
  }
}
