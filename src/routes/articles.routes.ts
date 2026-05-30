import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// Public: list articles
router.get('/', async (req: Request, res: Response) => {
  const { tag } = req.query as { tag?: string };
  const articles = await prisma.article.findMany({
    where: {
      published: true,
      ...(tag && tag !== 'all' ? { tag } : {}),
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json(articles);
});

// Public: single article
router.get('/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const article = await prisma.article.findUnique({ where: { id: req.params.id } });
  if (!article) { res.status(404).json({ error: 'Article not found' }); return; }
  res.json(article);
});

// Admin: create
router.post(
  '/',
  requireAuth,
  [
    body('category').notEmpty(),
    body('title').notEmpty(),
    body('excerpt').notEmpty(),
    body('imageUrl').isURL(),
    body('tag').notEmpty(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { res.status(400).json({ errors: errors.array() }); return; }
    const article = await prisma.article.create({ data: req.body });
    res.status(201).json(article);
  },
);

// Admin: update
router.patch('/:id', requireAuth, async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const article = await prisma.article.update({
    where: { id: req.params.id },
    data: req.body,
  }).catch(() => null);
  if (!article) { res.status(404).json({ error: 'Article not found' }); return; }
  res.json(article);
});

// Admin: delete
router.delete('/:id', requireAuth, async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  await prisma.article.delete({ where: { id: req.params.id } }).catch(() => null);
  res.status(204).send();
});

export default router;
