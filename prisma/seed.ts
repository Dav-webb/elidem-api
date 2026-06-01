import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const articles = [
  {
    category: 'Home Care', categoryIcon: 'fa-solid fa-house-medical', tag: 'homecare',
    title: '5 Signs You Should Book a Home Visit Instead of Going to the Hospital',
    excerpt: 'Long queues and overcrowded hospitals aren\'t always the answer. Learn when a certified home visit is safer, faster, and more effective for your recovery.',
    imageUrl: 'https://images.pexels.com/photos/7345468/pexels-photo-7345468.jpeg?auto=compress&cs=tinysrgb&w=700&fit=crop',
    imageAlt: 'Doctor conducting a home visit with patient',
    readTime: '4 min read', date: 'May 20, 2026',
    content: `
<p>Ghana's hospitals are working harder than ever, but that doesn't mean every health concern requires a trip to a waiting room. For many patients, a certified home visit is not just more convenient — it is clinically safer.</p>

<h3>1. You or a Loved One Has Mobility Challenges</h3>
<p>For elderly patients, those recovering from surgery, or anyone with a disability, travelling to a hospital can be exhausting and risky. A fall during transit, exposure to hospital-acquired infections, or simply the physical toll of the journey can worsen an already fragile condition. A home visit eliminates all of that.</p>

<h3>2. You Are Recovering From Surgery or Illness</h3>
<p>Post-discharge care is one of the most critical — and most neglected — phases of recovery. Wound checks, medication management, and follow-up assessments are all services our nurses can deliver at your bedside, reducing your risk of readmission significantly.</p>

<h3>3. You Have a Chronic Condition That Needs Regular Monitoring</h3>
<p>Conditions like diabetes, hypertension, and heart disease require consistent monitoring. Visiting a hospital every week is impractical. Regular home visits from a certified nurse mean your numbers are tracked, your medication is managed, and problems are caught early.</p>

<h3>4. You Have Young Children Who Are Unwell</h3>
<p>Taking a sick child to a crowded outpatient department exposes them to other infections and causes unnecessary distress. Our paediatric nurses are trained to conduct thorough assessments at home, and can refer you for further care only when genuinely necessary.</p>

<h3>5. Your Condition Does Not Require Emergency Intervention</h3>
<p>Not every fever, wound, or symptom is an emergency. If your situation is stable but you need professional assessment or treatment, a home visit is almost always the smarter, faster, and less costly option.</p>

<p><strong>Not sure if your situation qualifies?</strong> WhatsApp us and our clinical team will advise you — for free — within the hour.</p>
    `.trim(),
  },
  {
    category: 'Chronic Care', categoryIcon: 'fa-solid fa-heart-pulse', tag: 'chronic',
    title: 'How to Manage Diabetes at Home: A Guide from Our Nurses',
    excerpt: 'Managing diabetes doesn\'t have to mean constant hospital visits. Our certified nurses share practical daily routines, diet tips, and monitoring strategies.',
    imageUrl: 'https://images.pexels.com/photos/7653639/pexels-photo-7653639.jpeg?auto=compress&cs=tinysrgb&w=700&fit=crop',
    imageAlt: 'Patient checking blood glucose level at home',
    readTime: '6 min read', date: 'May 14, 2026',
    content: `
<p>Diabetes is one of Ghana's fastest-growing chronic conditions, affecting hundreds of thousands of families. The good news: with the right daily habits, blood sugar can be managed effectively at home — reducing complications and improving quality of life enormously.</p>

<h3>Monitor Your Blood Sugar Every Day</h3>
<p>Consistency is everything. Test your blood glucose at the same time each day — typically before breakfast and two hours after your main meal. Keep a log of your readings so you can spot trends before they become problems. If your numbers are frequently outside your target range, contact a healthcare provider immediately.</p>

<h3>Follow a Balanced, Low-Glycaemic Diet</h3>
<p>Focus on local Ghanaian foods that are naturally low in refined carbohydrates: kontomire stew, garden eggs, beans, fish, and vegetables. Reduce your intake of white rice, sugary drinks, and processed snacks. Small, frequent meals are better than large ones that spike blood sugar dramatically.</p>

<h3>Exercise for at Least 30 Minutes Daily</h3>
<p>Physical activity helps your body use insulin more efficiently. A 30-minute walk, light stretching, or even dancing counts. If you have mobility challenges, our nurses can design a safe, seated exercise plan tailored to your condition.</p>

<h3>Take Your Medication as Prescribed — Never Skip</h3>
<p>Missing medication is one of the leading causes of diabetic complications. Set phone reminders, use a pill organiser, or have a family member support your routine. Our medication management service includes scheduled home visits to administer injections and monitor compliance.</p>

<h3>Check Your Feet Every Day</h3>
<p>Diabetic neuropathy (nerve damage) means foot injuries often go unnoticed. Inspect your feet each evening for cuts, blisters, or swelling. Wear comfortable, closed-toe footwear and never walk barefoot — even indoors.</p>

<h3>When to Call Us</h3>
<p>Contact Elidem immediately if: your blood sugar is consistently above 15 mmol/L or below 4 mmol/L, you notice any foot wounds, you feel confused or unusually fatigued, or you have unexplained weight loss.</p>
    `.trim(),
  },
  {
    category: 'Wellness', categoryIcon: 'fa-solid fa-leaf', tag: 'wellness',
    title: 'Understanding Blood Pressure: What Your Numbers Actually Mean',
    excerpt: 'High blood pressure is often called the "silent killer." We break down what your readings mean and when you should seek immediate medical attention.',
    imageUrl: 'https://images.pexels.com/photos/5721671/pexels-photo-5721671.jpeg?auto=compress&cs=tinysrgb&w=700&fit=crop',
    imageAlt: 'Nurse measuring patient blood pressure',
    readTime: '5 min read', date: 'May 8, 2026',
    content: `
<p>Blood pressure is one of the most important health numbers you will ever track — yet many Ghanaians have never had theirs properly checked. Understanding your reading takes less than two minutes, and it could save your life.</p>

<h3>What Do the Two Numbers Mean?</h3>
<p>A blood pressure reading has two parts: <strong>systolic</strong> (top number) — the pressure when your heart beats; and <strong>diastolic</strong> (bottom number) — the pressure when your heart rests between beats. They are measured in millimetres of mercury (mmHg).</p>

<h3>Blood Pressure Ranges</h3>
<ul>
  <li><strong>Normal:</strong> Below 120/80 mmHg</li>
  <li><strong>Elevated:</strong> 120–129 / below 80 mmHg — lifestyle changes recommended</li>
  <li><strong>Stage 1 Hypertension:</strong> 130–139 / 80–89 mmHg — consult a doctor</li>
  <li><strong>Stage 2 Hypertension:</strong> 140+ / 90+ mmHg — medication likely needed</li>
  <li><strong>Hypertensive Crisis:</strong> Above 180/120 mmHg — seek emergency care immediately</li>
</ul>

<h3>Why High Blood Pressure Is Called the "Silent Killer"</h3>
<p>Most people with high blood pressure feel completely normal. There are no obvious symptoms until serious damage has already occurred — to your heart, kidneys, or brain. This is why regular monitoring is the only reliable way to know your status.</p>

<h3>What Causes High Blood Pressure?</h3>
<p>Common causes include excess salt intake, obesity, smoking, alcohol, chronic stress, lack of physical activity, and family history. Many of these are modifiable with lifestyle changes alone.</p>

<h3>How Often Should You Check?</h3>
<p>If your blood pressure is normal: once a year. If you have elevated readings or are on medication: weekly or as directed by your clinician. Our health monitoring service includes regular home blood pressure checks so you never have to guess.</p>
    `.trim(),
  },
  {
    category: 'Home Care', categoryIcon: 'fa-solid fa-bandage', tag: 'homecare',
    title: 'Wound Care After Surgery: Do\'s and Don\'ts for Safe Recovery',
    excerpt: 'Improper wound care at home is a leading cause of post-surgical infections. Our wound specialists share the essential steps to ensure safe, clean healing.',
    imageUrl: 'https://images.pexels.com/photos/5721552/pexels-photo-5721552.jpeg?auto=compress&cs=tinysrgb&w=700&fit=crop',
    imageAlt: 'Nurse applying sterile wound dressing',
    readTime: '5 min read', date: 'Apr 30, 2026',
    content: `
<p>Every year, thousands of patients are readmitted to hospital after surgery due to preventable wound infections. The quality of care in the days after you leave hospital is as important as the surgery itself. Here is what our wound care nurses want every patient to know.</p>

<h3>The Do's</h3>
<ul>
  <li><strong>Keep the wound dry for the first 24–48 hours</strong> after surgery unless your clinician advises otherwise.</li>
  <li><strong>Wash your hands thoroughly</strong> before and after touching the wound or dressing.</li>
  <li><strong>Change dressings on schedule</strong> — typically every 1–2 days or whenever they become wet or soiled.</li>
  <li><strong>Inspect the wound daily</strong> for signs of infection (redness, warmth, swelling, discharge, or odour).</li>
  <li><strong>Take all prescribed antibiotics</strong> for the full course, even if the wound looks fine.</li>
  <li><strong>Eat protein-rich foods</strong> (eggs, fish, beans) to support tissue repair.</li>
</ul>

<h3>The Don'ts</h3>
<ul>
  <li><strong>Don't use cotton wool directly</strong> on open wounds — fibres can get embedded and cause infection.</li>
  <li><strong>Don't apply traditional remedies</strong> (herbs, powders, petroleum jelly) to surgical wounds without clinical guidance.</li>
  <li><strong>Don't soak the wound</strong> in water (no baths or swimming until fully healed).</li>
  <li><strong>Don't remove scabs</strong> — they are part of the natural healing process.</li>
  <li><strong>Don't ignore pain that worsens</strong> after the first 48 hours — this is a warning sign.</li>
</ul>

<h3>When to Call Us Immediately</h3>
<p>Contact Elidem if you notice: increased redness or swelling spreading beyond the wound edges; yellow, green, or foul-smelling discharge; fever above 38°C; wound edges that appear to be separating; or severe pain that is not controlled by your prescribed medication.</p>

<p>Our wound care nurses perform home dressing changes with sterile, clinical-grade materials — far safer than attempting complex wound management alone.</p>
    `.trim(),
  },
  {
    category: 'Health Tech', categoryIcon: 'fa-solid fa-video', tag: 'tech',
    title: 'Getting the Most Out of Your Telemedicine Consultation',
    excerpt: 'Telemedicine is convenient — but only when done right. Here\'s how to prepare, what to say, and how to ensure your online appointment is as effective as in-person care.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&auto=format&fit=crop&q=75',
    imageAlt: 'Black doctor on telemedicine phone consultation',
    readTime: '4 min read', date: 'Apr 22, 2026',
    content: `
<p>Telemedicine has transformed healthcare access across Ghana — but a poorly prepared consultation wastes time and leads to incomplete care. Here is how to make every second of your virtual appointment count.</p>

<h3>Before the Consultation</h3>
<ul>
  <li><strong>Test your connection.</strong> Use Wi-Fi if possible. A stable connection prevents frustrating drop-outs mid-consultation.</li>
  <li><strong>Find a quiet, well-lit space.</strong> Your doctor needs to see your face clearly and hear you without background noise.</li>
  <li><strong>List your symptoms in order of severity.</strong> Write them down — it is easy to forget details when you are unwell.</li>
  <li><strong>Have your medications ready.</strong> Your doctor will likely ask what you are currently taking — have the names and dosages available.</li>
  <li><strong>Know your medical history.</strong> Previous diagnoses, surgeries, allergies, and family history are all relevant.</li>
</ul>

<h3>During the Consultation</h3>
<p>Be specific. Instead of "I feel unwell," say "I have had a headache on the right side of my head for three days, it is worse in the morning, and I have been mildly nauseous." The more precise you are, the more accurate your diagnosis will be.</p>
<p>Do not be embarrassed to ask your doctor to clarify anything you do not understand. It is your health — you deserve to fully understand your diagnosis and treatment plan.</p>

<h3>After the Consultation</h3>
<ul>
  <li>Follow up on any prescriptions or referrals the same day.</li>
  <li>If your condition worsens after 24 hours, contact us again — do not wait for your next scheduled appointment.</li>
  <li>Share the consultation summary with a family member who is helping manage your care.</li>
</ul>

<p>Elidem's telemedicine service is staffed by qualified doctors who will follow up in person if your condition requires it — ensuring you never fall through the gaps.</p>
    `.trim(),
  },
  {
    category: 'Wellness', categoryIcon: 'fa-solid fa-utensils', tag: 'wellness',
    title: 'Eating Well on a Budget: Nutrition Tips for Ghanaian Families',
    excerpt: 'Good health starts with good food. Our nutritional advisor shares affordable, locally available foods that boost immunity, manage blood sugar, and support heart health.',
    imageUrl: 'https://images.pexels.com/photos/6097807/pexels-photo-6097807.jpeg?auto=compress&cs=tinysrgb&w=700&fit=crop',
    imageAlt: 'Black female doctor picking fresh vegetables for nutrition advice',
    readTime: '5 min read', date: 'Apr 15, 2026',
    content: `
<p>Nutritious food does not have to be expensive. Ghana's local markets are full of powerful, affordable ingredients that modern nutrition science confirms are among the best foods in the world. Here is how to eat for health without stretching your budget.</p>

<h3>Embrace Local Superfoods</h3>
<ul>
  <li><strong>Garden eggs (African eggplant)</strong> — low in calories, high in fibre and antioxidants. Excellent for blood sugar management.</li>
  <li><strong>Kontomire (cocoyam leaves)</strong> — rich in iron, calcium, and vitamins A and C. One of the most nutritionally dense vegetables available.</li>
  <li><strong>Groundnuts (peanuts)</strong> — high in protein and healthy fats. A small handful daily supports brain and heart health.</li>
  <li><strong>Kenkey with fish</strong> — a fermented whole grain paired with lean protein. A balanced meal when portioned correctly.</li>
  <li><strong>Plantain</strong> — complex carbohydrates that release energy slowly. Green plantain is better than ripe for blood sugar control.</li>
</ul>

<h3>Tips to Reduce Food Costs Without Reducing Nutrition</h3>
<ul>
  <li>Buy in season — seasonal produce is cheaper and fresher.</li>
  <li>Cook with dried beans and lentils — cheaper than meat and packed with protein and fibre.</li>
  <li>Avoid processed packaged foods — they are more expensive per calorie and nutrient-poor.</li>
  <li>Cook at home and prepare large batches to last several days.</li>
</ul>

<h3>What to Reduce</h3>
<p>Minimise white rice, sugary drinks (including "healthy-looking" juice drinks), fried snacks, and highly processed oils. These are calorie-dense, nutrient-poor, and directly linked to the rise of diabetes and hypertension in Ghana.</p>

<p>If you have a specific condition (diabetes, hypertension, kidney disease), our nurses can provide a personalised meal plan tailored to your health needs during a home visit.</p>
    `.trim(),
  },
  {
    category: 'Chronic Care', categoryIcon: 'fa-solid fa-lungs', tag: 'chronic',
    title: 'Living With Hypertension: A Practical Daily Management Plan',
    excerpt: 'Hypertension affects 1 in 3 adults in Ghana. Our specialists outline a realistic daily plan covering medication, exercise, stress management, and monitoring.',
    imageUrl: 'https://images.pexels.com/photos/18828738/pexels-photo-18828738.jpeg?auto=compress&cs=tinysrgb&w=700&fit=crop',
    imageAlt: 'Black female specialist advising patient on hypertension management',
    readTime: '7 min read', date: 'Apr 8, 2026',
    content: `
<p>Hypertension — chronically high blood pressure — is the single largest contributor to heart disease and stroke in Ghana. The frustrating reality is that it can be almost entirely controlled with the right daily habits. Here is a practical, realistic plan from our clinical team.</p>

<h3>Morning Routine</h3>
<ul>
  <li>Take your medication at the same time every morning — before breakfast if your doctor has advised it.</li>
  <li>Check your blood pressure and log the reading. Two readings, two minutes apart, averaged together.</li>
  <li>Start the day with warm water and a light, low-salt breakfast.</li>
</ul>

<h3>Salt: Your Most Important Target</h3>
<p>The World Health Organization recommends less than 5g of salt per day. Most Ghanaians consume significantly more. Practical steps: stop adding salt at the table, reduce stock cubes and seasoning packets, use fresh herbs and spices instead, and avoid processed and canned foods.</p>

<h3>Exercise</h3>
<p>Aim for 30 minutes of moderate activity five days a week. This does not require a gym — brisk walking, household chores, gardening, or dancing all count. Regular exercise can lower your systolic blood pressure by 5–8 mmHg on its own.</p>

<h3>Manage Stress</h3>
<p>Chronic stress directly raises blood pressure. Identify your main stressors and take deliberate steps: prayer, deep breathing exercises, reducing screen time, adequate sleep (7–8 hours), and regular connection with family and community.</p>

<h3>Alcohol and Smoking</h3>
<p>If you drink alcohol, limit it strictly. Smoking constricts blood vessels and raises blood pressure acutely — quitting is one of the single most impactful things you can do for your cardiovascular health.</p>

<h3>Never Stop Medication Without Advice</h3>
<p>Many patients feel well and stop their medication — this is dangerous. Hypertension has no symptoms, and stopping medication abruptly can cause a dangerous rebound spike. Always consult your doctor before changing your medication routine.</p>
    `.trim(),
  },
  {
    category: 'Home Care', categoryIcon: 'fa-solid fa-user-nurse', tag: 'homecare',
    title: 'Why Home Healthcare is the Future for Ghanaian Families',
    excerpt: 'Hospital overcrowding, long wait times, and rising transport costs are pushing patients toward smarter alternatives. Here\'s why home-based care is changing Ghana\'s health landscape.',
    imageUrl: 'https://images.unsplash.com/photo-1590611936760-eeb9bc598548?w=700&auto=format&fit=crop&q=75',
    imageAlt: 'Black healthcare worker providing home care',
    readTime: '6 min read', date: 'Mar 29, 2026',
    content: `
<p>Ghana's healthcare system is under enormous pressure. Hospital beds are stretched thin, specialists are concentrated in major cities, and for millions of Ghanaians — particularly in peri-urban and rural areas — accessing quality care means hours of travel and hours more in waiting rooms.</p>
<p>Home healthcare is not a luxury or a shortcut. It is a smarter model of care delivery that is transforming health outcomes across the world — and in Ghana, its time has come.</p>

<h3>The Problem With the Current Model</h3>
<p>The traditional "patient travels to hospital" model made sense when most health concerns required diagnostic equipment only available at a facility. Today, portable devices can measure blood pressure, blood oxygen, heart rhythm, and blood glucose at home with clinical accuracy. Many consultations that require a physical journey can now be done safely and effectively via telemedicine.</p>

<h3>Home Care Is Often Clinically Better</h3>
<p>Studies consistently show that patients recover faster at home than in hospital. The reasons are clear: lower infection risk (hospitals are full of pathogens), reduced stress, familiar environment, and the involvement of family caregivers. For elderly and chronically ill patients especially, avoiding unnecessary hospitalisation is a clinical priority — not just a preference.</p>

<h3>It Is More Affordable Than You Think</h3>
<p>When you factor in transport costs, time away from work, and the hidden costs of hospital care, a professional home visit is frequently more affordable than a hospital outpatient visit. Elidem's transparent pricing means you know what you are paying before anyone walks through your door.</p>

<h3>The Elidem Model</h3>
<p>At Elidem, we have built a service that delivers hospital-grade clinical care — wound dressing, medication administration, health monitoring, specialist consultations — to your home, on your schedule. Our clinicians are licensed, trained, and equipped to handle the full spectrum of non-emergency healthcare needs.</p>
<p>As Ghana's middle class grows and expectations for healthcare quality rise, home-based care is not the future — it is already happening. And we are here to make sure every Ghanaian family can access it.</p>
    `.trim(),
  },
];

async function main() {
  console.log('Seeding database...');

  // Admin user
  const passwordHash = await bcrypt.hash('ElidemAdmin2026!', 12);
  await prisma.adminUser.upsert({
    where: { email: 'admin@elidemhomecare.com' },
    update: {},
    create: { email: 'admin@elidemhomecare.com', passwordHash, name: 'Elidem Admin', role: 'admin' },
  });
  console.log('✓ Admin user');

  // Articles
  await prisma.article.deleteMany();
  await prisma.article.createMany({ data: articles });
  console.log('✓ 8 articles with full content');

  // Specialists
  await prisma.specialist.deleteMany();
  await prisma.specialist.createMany({
    data: [
      { name: 'Dr. Adwoa M.',  specialty: 'General Practice', rating: 4.9, imageUrl: 'https://images.pexels.com/photos/19596247/pexels-photo-19596247.jpeg?auto=compress&cs=tinysrgb&w=300&h=260&fit=crop', imageAlt: 'Dr. Adwoa Mensah',    available: true, category: 'general',     sortOrder: 1 },
      { name: 'Dr. Kofi A.',   specialty: 'Urology',          rating: 4.9, imageUrl: 'https://images.pexels.com/photos/6129652/pexels-photo-6129652.jpeg?auto=compress&cs=tinysrgb&w=300&h=260&fit=crop',   imageAlt: 'Dr. Kofi Adu',       available: true, category: 'specialist',  sortOrder: 2 },
      { name: 'Dr. Esi B.',    specialty: 'Pediatrics',        rating: 4.8, imageUrl: 'https://images.pexels.com/photos/5234473/pexels-photo-5234473.jpeg?auto=compress&cs=tinysrgb&w=300&h=260&fit=crop',   imageAlt: 'Dr. Esi Boateng',    available: true, category: 'pediatrics',  sortOrder: 3 },
      { name: 'Dr. Yaw O.',    specialty: 'Cardiology',        rating: 5.0, imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=260&auto=format&fit=crop&q=75',                  imageAlt: 'Dr. Yaw Ofori',      available: true, category: 'specialist',  sortOrder: 4 },
      { name: 'Dr. Akosua T.', specialty: 'Neurology',         rating: 4.7, imageUrl: 'https://images.pexels.com/photos/18828738/pexels-photo-18828738.jpeg?auto=compress&cs=tinysrgb&w=300&h=260&fit=crop',  imageAlt: 'Dr. Akosua Tetteh',  available: true, category: 'home-visits', sortOrder: 5 },
      { name: 'Dr. Kwame F.',  specialty: 'Ophthalmology',     rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1666887360921-85952a86894f?w=300&h=260&auto=format&fit=crop&q=75',                  imageAlt: 'Dr. Kwame Frimpong', available: true, category: 'specialist',  sortOrder: 6 },
    ],
  });
  console.log('✓ 6 specialists');

  // Services
  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: [
      { title: 'Telemedicine Consultations',  description: 'Connect with qualified doctors from anywhere — no waiting rooms, no travel stress.',                          icon: 'fa-solid fa-video',         badgeLabel: 'Telemedicine',   imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=75', imageAlt: 'Black doctor on telemedicine consultation',        features: ['Video and audio consultations', 'Prescription & referral letters', 'Follow-up scheduling'],          sortOrder: 1 },
      { title: 'Medication Management',        description: 'Safe administration, scheduling and monitoring by certified nurses at home.',                                icon: 'fa-solid fa-pills',         badgeLabel: 'Medication',     imageUrl: 'https://images.pexels.com/photos/5452270/pexels-photo-5452270.jpeg?auto=compress&cs=tinysrgb&w=600&fit=crop', imageAlt: 'Black female doctor with medication tablets',     features: ['Scheduled dispensing reminders', 'IV and injection administration', 'Medication reconciliation'],     sortOrder: 2 },
      { title: 'Home Medical Visits',          description: 'Clinicians visit you for consultations, check-ups and follow-up care at your convenience.',                  icon: 'fa-solid fa-house-medical', badgeLabel: 'Home Visits',    imageUrl: 'https://images.pexels.com/photos/7345468/pexels-photo-7345468.jpeg?auto=compress&cs=tinysrgb&w=600&fit=crop', imageAlt: 'Doctor conducting a home visit with patient',     features: ['General check-up and diagnosis', 'Post-discharge follow-up', 'Chronic disease management'],          sortOrder: 3 },
      { title: 'Wound Care & Dressing',        description: 'Sterile wound management and dressing changes with clinical precision and care.',                            icon: 'fa-solid fa-bandage',       badgeLabel: 'Wound Care',     imageUrl: 'https://images.pexels.com/photos/5721552/pexels-photo-5721552.jpeg?auto=compress&cs=tinysrgb&w=600&fit=crop', imageAlt: 'Nurse applying sterile wound dressing',          features: ['Surgical & diabetic wound care', 'Sterile dressing changes', 'Infection monitoring & prevention'],   sortOrder: 4 },
      { title: 'Health Monitoring & Lab',      description: 'Regular health checks, BP, blood sugar, and diagnostic tests at your convenience.',                          icon: 'fa-solid fa-flask-vial',    badgeLabel: 'Lab Services',   imageUrl: 'https://images.pexels.com/photos/5721671/pexels-photo-5721671.jpeg?auto=compress&cs=tinysrgb&w=600&fit=crop', imageAlt: 'Nurse measuring blood pressure for health monitoring', features: ['Blood pressure & blood sugar checks', 'Sample collection at home', 'Results reviewed by a doctor'], sortOrder: 5 },
      { title: 'Specialised Vulnerable Care',  description: 'Dedicated support for the elderly, children and those with complex health conditions.',                      icon: 'fa-solid fa-user-shield',   badgeLabel: 'Vulnerable Care', imageUrl: 'https://images.pexels.com/photos/7551668/pexels-photo-7551668.jpeg?auto=compress&cs=tinysrgb&w=600&fit=crop', imageAlt: 'Caregiver assisting elderly patient at home',    features: ['Elderly & palliative care', 'Paediatric home nursing', 'Post-surgery recovery support'],             sortOrder: 6 },
    ],
  });
  console.log('✓ 6 services');

  // Pricing
  await prisma.pricingTier.deleteMany();
  await prisma.pricingTier.createMany({
    data: [
      { name: 'Basic',    icon: 'fa-solid fa-seedling', price: 'GH₵ 150', period: 'per visit',  featured: false,                       features: ['Telemedicine consultation', 'Basic health assessment', 'Medication advice & guidance', 'Written care summary', 'Follow-up via WhatsApp'],                                                              sortOrder: 1 },
      { name: 'Standard', icon: 'fa-solid fa-star',     price: 'GH₵ 350', period: 'per visit',  featured: true,  badge: 'Most Popular', features: ['Everything in Basic', 'In-home medical visit', 'Wound care (1 session)', 'Lab sample collection', 'Medication administration', 'Priority scheduling'],                                              sortOrder: 2 },
      { name: 'Premium',  icon: 'fa-solid fa-crown',    price: 'GH₵ 750', period: 'per month',  featured: false,                       features: ['Everything in Standard', 'Weekly home monitoring', 'Specialist referral & liaison', '24/7 dedicated care line', 'Monthly health report', 'Unlimited WhatsApp support'],                              sortOrder: 3 },
    ],
  });
  console.log('✓ 3 pricing tiers');

  // Steps
  await prisma.step.deleteMany();
  await prisma.step.createMany({
    data: [
      { num: '1', icon: 'fa-solid fa-comment-medical',           title: 'Contact Us',               desc: 'Reach us via WhatsApp, call, or our contact form. Tell us your condition and preferred time.', sortOrder: 1 },
      { num: '2', icon: 'fa-solid fa-user-nurse',                 title: 'We Dispatch a Specialist', desc: 'We assign the right certified professional for your condition and location.',                  sortOrder: 2 },
      { num: '3', icon: 'fa-solid fa-house-medical-circle-check', title: 'Care at Your Door',        desc: 'Your clinician arrives fully equipped to deliver expert clinical care at your home.',          sortOrder: 3 },
    ],
  });
  console.log('✓ 3 steps');

  console.log('\n✅ Database seeded successfully!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
