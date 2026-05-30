import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';

import { errorHandler, notFound } from './middleware/error.middleware';
import authRoutes        from './routes/auth.routes';
import articlesRoutes    from './routes/articles.routes';
import specialistsRoutes from './routes/specialists.routes';
import servicesRoutes    from './routes/services.routes';
import pricingRoutes     from './routes/pricing.routes';
import stepsRoutes       from './routes/steps.routes';
import bookingsRoutes    from './routes/bookings.routes';

const app = express();

// Manual CORS — compatible with all Node versions
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = process.env.FRONTEND_URL ?? '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') { res.sendStatus(204); return; }
  next();
});

app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/auth',        authRoutes);
app.use('/api/articles',    articlesRoutes);
app.use('/api/specialists', specialistsRoutes);
app.use('/api/services',    servicesRoutes);
app.use('/api/pricing',     pricingRoutes);
app.use('/api/steps',       stepsRoutes);
app.use('/api/bookings',    bookingsRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = Number(process.env.PORT ?? 3000);
app.listen(PORT, () => console.log(`Elidem API running on port ${PORT}`));
