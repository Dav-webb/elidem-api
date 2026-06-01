import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth.middleware';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env['GMAIL_USER'], pass: process.env['GMAIL_APP_PASSWORD'] },
});

async function sendBookingNotification(booking: {
  name: string; phone: string; email?: string | null;
  service?: string | null; message?: string | null;
}): Promise<void> {
  const adminEmail = process.env['GMAIL_USER'];
  if (!adminEmail) return;

  const html = `
    <h2 style="color:#16a34a">New Booking — Elidem Homecare</h2>
    <table style="border-collapse:collapse;width:100%;max-width:500px">
      <tr><td style="padding:8px;font-weight:bold;background:#f0fdf4">Name</td><td style="padding:8px">${booking.name}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f0fdf4">Phone</td><td style="padding:8px">${booking.phone}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f0fdf4">Email</td><td style="padding:8px">${booking.email ?? '—'}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f0fdf4">Service</td><td style="padding:8px">${booking.service ?? '—'}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f0fdf4">Message</td><td style="padding:8px">${booking.message ?? '—'}</td></tr>
    </table>
    <p style="color:#6b7280;font-size:12px;margin-top:16px">Elidem Homecare Admin Notification</p>
  `;

  await transporter.sendMail({
    from: `"Elidem Homecare" <${adminEmail}>`,
    to: adminEmail,
    subject: `New Booking from ${booking.name}`,
    html,
  });

  if (booking.email) {
    await transporter.sendMail({
      from: `"Elidem Homecare" <${adminEmail}>`,
      to: booking.email,
      subject: 'Booking Received — Elidem Homecare',
      html: `
        <h2 style="color:#16a34a">Thank You, ${booking.name}!</h2>
        <p>We have received your booking request and our team will contact you within 24 hours.</p>
        <p><strong>Service requested:</strong> ${booking.service ?? 'General enquiry'}</p>
        <p>You can also reach us immediately on WhatsApp: <strong>0248011188</strong></p>
        <p style="color:#6b7280;font-size:12px">Elidem Homecare — Professional Home Healthcare in Ghana</p>
      `,
    });
  }
}

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

    sendBookingNotification({ name, phone, email, service, message }).catch(() => {});

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
