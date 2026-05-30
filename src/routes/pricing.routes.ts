import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// Public: list pricing tiers
router.get('/', async (_req: Request, res: Response) => {
  const tiers = await prisma.pricingTier.findMany({ orderBy: { sortOrder: 'asc' } });
  res.json(tiers);
});

// Admin: create
router.post('/', requireAuth, async (req: Request, res: Response) => {
  const tier = await prisma.pricingTier.create({ data: req.body });
  res.status(201).json(tier);
});

// Admin: update
router.patch('/:id', requireAuth, async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const tier = await prisma.pricingTier.update({
    where: { id: req.params.id },
    data: req.body,
  }).catch(() => null);
  if (!tier) { res.status(404).json({ error: 'Pricing tier not found' }); return; }
  res.json(tier);
});

// Admin: delete
router.delete('/:id', requireAuth, async (req: Request<{ id: string }>, res: Response) => {
  await prisma.pricingTier.delete({ where: { id: req.params.id } }).catch(() => null);
  res.status(204).send();
});

export default router;
