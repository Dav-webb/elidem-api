import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// Public: list specialists
router.get('/', async (req: Request, res: Response) => {
  const { category } = req.query as { category?: string };
  const specialists = await prisma.specialist.findMany({
    where: {
      available: true,
      ...(category && category !== 'all' ? { category } : {}),
    },
    orderBy: { sortOrder: 'asc' },
  });
  res.json(specialists);
});

// Admin: create
router.post('/', requireAuth, async (req: Request, res: Response) => {
  const specialist = await prisma.specialist.create({ data: req.body });
  res.status(201).json(specialist);
});

// Admin: update
router.patch('/:id', requireAuth, async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const specialist = await prisma.specialist.update({
    where: { id: req.params.id },
    data: req.body,
  }).catch(() => null);
  if (!specialist) { res.status(404).json({ error: 'Specialist not found' }); return; }
  res.json(specialist);
});

// Admin: delete
router.delete('/:id', requireAuth, async (req: Request<{ id: string }>, res: Response) => {
  await prisma.specialist.delete({ where: { id: req.params.id } }).catch(() => null);
  res.status(204).send();
});

export default router;
