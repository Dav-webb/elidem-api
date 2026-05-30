import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// Public: list services
router.get('/', async (_req: Request, res: Response) => {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { sortOrder: 'asc' },
  });
  res.json(services);
});

// Admin: create
router.post('/', requireAuth, async (req: Request, res: Response) => {
  const service = await prisma.service.create({ data: req.body });
  res.status(201).json(service);
});

// Admin: update
router.patch('/:id', requireAuth, async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const service = await prisma.service.update({
    where: { id: req.params.id },
    data: req.body,
  }).catch(() => null);
  if (!service) { res.status(404).json({ error: 'Service not found' }); return; }
  res.json(service);
});

// Admin: delete
router.delete('/:id', requireAuth, async (req: Request<{ id: string }>, res: Response) => {
  await prisma.service.delete({ where: { id: req.params.id } }).catch(() => null);
  res.status(204).send();
});

export default router;
