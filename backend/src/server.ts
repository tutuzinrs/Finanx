import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

import { routes as authRoutes } from './routes/auth.routes';
import { routes as transactionRoutes } from './routes/transaction.routes';
import { routes as categoryRoutes } from './routes/category.routes';

app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);
app.use('/categories', categoryRoutes);

const PORT = process.env.PORT || 3333;

app.get('/', (req, res) => {
  res.json({ message: 'Gestão Financeira API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
