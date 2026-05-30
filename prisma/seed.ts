import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Admin user
  const passwordHash = await bcrypt.hash('ElidemAdmin2026!', 12);
  await prisma.adminUser.upsert({
    where: { email: 'admin@elidemhomecare.com' },
    update: {},
    create: {
      email: 'admin@elidemhomecare.com',
      passwordHash,
      name: 'Elidem Admin',
      role: 'admin',
    },
  });
  console.log('✓ Admin user created — email: admin@elidemhomecare.com | password: ElidemAdmin2026!');

  // Articles
  await prisma.article.deleteMany();
  await prisma.article.createMany({
    data: [
      { category: 'Home Care',    categoryIcon: 'fa-solid fa-house-medical',  title: '5 Signs You Should Book a Home Visit Instead of Going to the Hospital',   excerpt: 'Long queues and overcrowded hospitals aren\'t always the answer. Learn when a certified home visit is safer, faster, and more effective for your recovery.',                                     imageUrl: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?w=700&auto=format&fit=crop&q=75', imageAlt: 'Nurse caring for patient at home',                       readTime: '4 min read', date: 'May 20, 2026', tag: 'homecare' },
      { category: 'Chronic Care', categoryIcon: 'fa-solid fa-heart-pulse',     title: 'How to Manage Diabetes at Home: A Guide from Our Nurses',                  excerpt: 'Managing diabetes doesn\'t have to mean constant hospital visits. Our certified nurses share practical daily routines, diet tips, and monitoring strategies.',                                   imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&auto=format&fit=crop&q=75', imageAlt: 'Healthcare professional monitoring patient',              readTime: '6 min read', date: 'May 14, 2026', tag: 'chronic'  },
      { category: 'Wellness',     categoryIcon: 'fa-solid fa-leaf',            title: 'Understanding Blood Pressure: What Your Numbers Actually Mean',            excerpt: 'High blood pressure is often called the "silent killer." We break down what your readings mean and when you should seek immediate medical attention.',                                             imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&auto=format&fit=crop&q=75', imageAlt: 'Doctor explaining health results to patient',             readTime: '5 min read', date: 'May 8, 2026',  tag: 'wellness' },
      { category: 'Home Care',    categoryIcon: 'fa-solid fa-bandage',         title: 'Wound Care After Surgery: Do\'s and Don\'ts for Safe Recovery',            excerpt: 'Improper wound care at home is a leading cause of post-surgical infections. Our wound specialists share the essential steps to ensure safe, clean healing.',                                        imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=700&auto=format&fit=crop&q=75', imageAlt: 'Professional wound care and dressing',                   readTime: '5 min read', date: 'Apr 30, 2026', tag: 'homecare' },
      { category: 'Health Tech',  categoryIcon: 'fa-solid fa-video',           title: 'Getting the Most Out of Your Telemedicine Consultation',                   excerpt: 'Telemedicine is convenient — but only when done right. Here\'s how to prepare, what to say, and how to ensure your online appointment is as effective as in-person care.',                        imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=700&auto=format&fit=crop&q=75', imageAlt: 'Doctor on telemedicine video call',                      readTime: '4 min read', date: 'Apr 22, 2026', tag: 'tech'     },
      { category: 'Wellness',     categoryIcon: 'fa-solid fa-utensils',        title: 'Eating Well on a Budget: Nutrition Tips for Ghanaian Families',            excerpt: 'Good health starts with good food. Our nutritional advisor shares affordable, locally available foods that boost immunity, manage blood sugar, and support heart health.',                           imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&auto=format&fit=crop&q=75', imageAlt: 'Doctor providing nutrition and wellness guidance',        readTime: '5 min read', date: 'Apr 15, 2026', tag: 'wellness' },
      { category: 'Chronic Care', categoryIcon: 'fa-solid fa-lungs',           title: 'Living With Hypertension: A Practical Daily Management Plan',             excerpt: 'Hypertension affects 1 in 3 adults in Ghana. Our specialists outline a realistic daily plan covering medication, exercise, stress management, and monitoring.',                                  imageUrl: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=700&auto=format&fit=crop&q=75', imageAlt: 'Specialist advising patient on hypertension management', readTime: '7 min read', date: 'Apr 8, 2026',  tag: 'chronic'  },
      { category: 'Home Care',    categoryIcon: 'fa-solid fa-user-nurse',      title: 'Why Home Healthcare is the Future for Ghanaian Families',                  excerpt: 'Hospital overcrowding, long wait times, and rising transport costs are pushing patients toward smarter alternatives. Here\'s why home-based care is changing Ghana\'s health landscape.',          imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=700&auto=format&fit=crop&q=75', imageAlt: 'Doctor making home healthcare visit',                    readTime: '6 min read', date: 'Mar 29, 2026', tag: 'homecare' },
    ],
  });
  console.log('✓ 8 articles seeded');

  // Specialists
  await prisma.specialist.deleteMany();
  await prisma.specialist.createMany({
    data: [
      { name: 'Dr. Adwoa M.',  specialty: 'General Practice', rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=260&auto=format&fit=crop&q=75', imageAlt: 'Dr. Adwoa Mensah',    available: true, category: 'general',     sortOrder: 1 },
      { name: 'Dr. Kofi A.',   specialty: 'Urology',          rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=260&auto=format&fit=crop&q=75', imageAlt: 'Dr. Kofi Adu',       available: true, category: 'specialist',  sortOrder: 2 },
      { name: 'Dr. Esi B.',    specialty: 'Pediatrics',        rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=260&auto=format&fit=crop&q=75', imageAlt: 'Dr. Esi Boateng',    available: true, category: 'pediatrics',  sortOrder: 3 },
      { name: 'Dr. Yaw O.',    specialty: 'Cardiology',        rating: 5.0, imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=260&auto=format&fit=crop&q=75', imageAlt: 'Dr. Yaw Ofori',      available: true, category: 'specialist',  sortOrder: 4 },
      { name: 'Dr. Akosua T.', specialty: 'Neurology',         rating: 4.7, imageUrl: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=300&h=260&auto=format&fit=crop&q=75', imageAlt: 'Dr. Akosua Tetteh',  available: true, category: 'home-visits', sortOrder: 5 },
      { name: 'Dr. Kwame F.',  specialty: 'Ophthalmology',     rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=260&auto=format&fit=crop&q=75', imageAlt: 'Dr. Kwame Frimpong', available: true, category: 'specialist',  sortOrder: 6 },
    ],
  });
  console.log('✓ 6 specialists seeded');

  // Services
  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: [
      { title: 'Telemedicine Consultations',  description: 'Connect with qualified doctors from anywhere — no waiting rooms, no travel stress.',                         icon: 'fa-solid fa-video',        badgeLabel: 'Telemedicine',    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&auto=format&fit=crop&q=75', imageAlt: 'Telemedicine consultation',            features: ['Video and audio consultations', 'Prescription & referral letters', 'Follow-up scheduling'],         sortOrder: 1 },
      { title: 'Medication Management',        description: 'Safe administration, scheduling and monitoring by certified nurses at home.',                               icon: 'fa-solid fa-pills',        badgeLabel: 'Medication',       imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=75', imageAlt: 'Nurse managing patient medication',    features: ['Scheduled dispensing reminders', 'IV and injection administration', 'Medication reconciliation'],    sortOrder: 2 },
      { title: 'Home Medical Visits',          description: 'Clinicians visit you for consultations, check-ups and follow-up care at your convenience.',                 icon: 'fa-solid fa-house-medical',badgeLabel: 'Home Visits',      imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&auto=format&fit=crop&q=75', imageAlt: 'Doctor home visit',                    features: ['General check-up and diagnosis', 'Post-discharge follow-up', 'Chronic disease management'],         sortOrder: 3 },
      { title: 'Wound Care & Dressing',        description: 'Sterile wound management and dressing changes with clinical precision and care.',                          icon: 'fa-solid fa-bandage',      badgeLabel: 'Wound Care',       imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&auto=format&fit=crop&q=75', imageAlt: 'Wound care and dressing',              features: ['Surgical & diabetic wound care', 'Sterile dressing changes', 'Infection monitoring & prevention'], sortOrder: 4 },
      { title: 'Health Monitoring & Lab',      description: 'Regular health checks, BP, blood sugar, and diagnostic tests at your convenience.',                        icon: 'fa-solid fa-flask-vial',   badgeLabel: 'Lab Services',     imageUrl: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=600&auto=format&fit=crop&q=75', imageAlt: 'Lab diagnostics',                      features: ['Blood pressure & blood sugar checks', 'Sample collection at home', 'Results reviewed by a doctor'], sortOrder: 5 },
      { title: 'Specialised Vulnerable Care',  description: 'Dedicated support for the elderly, children and those with complex health conditions.',                    icon: 'fa-solid fa-user-shield',  badgeLabel: 'Vulnerable Care',  imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=75', imageAlt: 'Elderly care specialist',              features: ['Elderly & palliative care', 'Paediatric home nursing', 'Post-surgery recovery support'],            sortOrder: 6 },
    ],
  });
  console.log('✓ 6 services seeded');

  // Pricing
  await prisma.pricingTier.deleteMany();
  await prisma.pricingTier.createMany({
    data: [
      { name: 'Basic',    icon: 'fa-solid fa-seedling', price: 'GH₵ 150', period: 'per visit',  featured: false, features: ['Telemedicine consultation', 'Basic health assessment', 'Medication advice & guidance', 'Written care summary', 'Follow-up via WhatsApp'],                                                              sortOrder: 1 },
      { name: 'Standard', icon: 'fa-solid fa-star',     price: 'GH₵ 350', period: 'per visit',  featured: true,  badge: 'Most Popular', features: ['Everything in Basic', 'In-home medical visit', 'Wound care (1 session)', 'Lab sample collection', 'Medication administration', 'Priority scheduling'],                           sortOrder: 2 },
      { name: 'Premium',  icon: 'fa-solid fa-crown',    price: 'GH₵ 750', period: 'per month', featured: false, features: ['Everything in Standard', 'Weekly home monitoring', 'Specialist referral & liaison', '24/7 dedicated care line', 'Monthly health report', 'Unlimited WhatsApp support'], sortOrder: 3 },
    ],
  });
  console.log('✓ 3 pricing tiers seeded');

  // Steps
  await prisma.step.deleteMany();
  await prisma.step.createMany({
    data: [
      { num: '1', icon: 'fa-solid fa-comment-medical',            title: 'Contact Us',              desc: 'Reach us via WhatsApp, call, or our contact form. Tell us your condition and preferred time.', sortOrder: 1 },
      { num: '2', icon: 'fa-solid fa-user-nurse',                  title: 'We Dispatch a Specialist', desc: 'We assign the right certified professional for your condition and location.',                  sortOrder: 2 },
      { num: '3', icon: 'fa-solid fa-house-medical-circle-check',  title: 'Care at Your Door',       desc: 'Your clinician arrives fully equipped to deliver expert clinical care at your home.',          sortOrder: 3 },
    ],
  });
  console.log('✓ 3 steps seeded');

  console.log('\n✅ Database seeded successfully!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
