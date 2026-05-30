import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// Public: list steps
router.get('/', async (_req: Request, res: Response) => {
  const steps = await prisma.step.findMany({ orderBy: { sortOrder: 'asc' } });
  res.json(steps);
});

// Admin: update a step
router.patch('/:id', requireAuth, async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const step = await prisma.step.update({
    where: { id: req.params.id },
    data: req.body,
  }).catch(() => null);
  if (!step) { res.status(404).json({ error: 'Step not found' }); return; }
  res.json(step);
});

export default router;
