import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// Public: submit a booking
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('email').optional({ checkFalsy: true }).isEmail().normalizeEmail(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { name, phone, email, service, message, specialistId } = req.body as {
      name: string;
      phone: string;
      email?: string;
      service?: string;
      message?: string;
      specialistId?: string;
    };

    const booking = await prisma.booking.create({
      data: { name, phone, email, service, message, specialistId },
    });

    res.status(201).json({ id: booking.id, message: 'Booking submitted successfully' });
  },
);

// Admin: list all bookings
router.get('/', requireAuth, async (req: Request, res: Response) => {
  const { status } = req.query as { status?: string };
  const bookings = await prisma.booking.findMany({
    where: status ? { status } : undefined,
    include: { specialist: { select: { name: true, specialty: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json(bookings);
});

// Admin: single booking
router.get('/:id', requireAuth, async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const booking = await prisma.booking.findUnique({
    where: { id: req.params.id },
    include: { specialist: true },
  });
  if (!booking) { res.status(404).json({ error: 'Booking not found' }); return; }
  res.json(booking);
});

// Admin: update booking (status, notes, assign specialist)
router.patch('/:id', requireAuth, async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const booking = await prisma.booking.update({
    where: { id: req.params.id },
    data: req.body,
    include: { specialist: true },
  }).catch(() => null);
  if (!booking) { res.status(404).json({ error: 'Booking not found' }); return; }
  res.json(booking);
});

// Admin: delete booking
router.delete('/:id', requireAuth, async (req: Request<{ id: string }>, res: Response) => {
  await prisma.booking.delete({ where: { id: req.params.id } }).catch(() => null);
  res.status(204).send();
});

export default router;
