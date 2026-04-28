-- Sample News Data for Testing
-- Run this after creating the news_schema.sql

-- Note: Replace 'YOUR_ADMIN_USER_ID' with your actual admin user ID
-- You can find it by running: SELECT uid, name FROM users WHERE role = 'admin';

-- Sample 1: Scholarship Announcement (Featured)
INSERT INTO public.news_posts (
  title,
  content,
  summary,
  category,
  "universityId",
  "universityName",
  "authorId",
  "authorName",
  deadline,
  tags,
  featured,
  published,
  "imageUrl"
) VALUES (
  'Full Scholarship Opportunity for Graduate Students',
  'Addis Ababa University is pleased to announce a full scholarship program for outstanding graduate students in Engineering and Natural Sciences. The scholarship covers full tuition, accommodation, and a monthly stipend.

Eligibility Criteria:
- Bachelor''s degree with CGPA of 3.5 or higher
- Ethiopian citizenship
- Age below 30 years
- Strong research interest

Application Requirements:
- Completed application form
- Academic transcripts
- Two recommendation letters
- Research proposal (2-3 pages)
- CV

The scholarship is funded by the Ministry of Education and aims to support 50 students across various departments.',
  'Apply for full tuition scholarship covering graduate studies in Engineering and Natural Sciences',
  'scholarship',
  'aau',
  'Addis Ababa University',
  NULL,
  'AAU Admin',
  '2026-06-30 23:59:59',
  ARRAY['graduate', 'engineering', 'full-scholarship', 'research'],
  true,
  true,
  NULL
);

-- Sample 2: Admission Announcement
INSERT INTO public.news_posts (
  title,
  content,
  summary,
  category,
  "universityId",
  "universityName",
  deadline,
  tags,
  featured,
  published
) VALUES (
  'Undergraduate Admission for 2026/2027 Academic Year',
  'Bahir Dar University announces the opening of undergraduate admission for the 2026/2027 academic year. We offer programs in Engineering, Natural Sciences, Social Sciences, Business, and Health Sciences.

Available Programs:
- Computer Science & Engineering
- Electrical & Computer Engineering
- Civil Engineering
- Medicine
- Business Administration
- Economics
- Biology
- Chemistry
- And many more...

Admission Process:
1. Complete online application
2. Submit required documents
3. Take entrance examination
4. Attend interview (for selected programs)

For more information, visit our admissions office or check our website.',
  'Apply now for undergraduate programs starting September 2026',
  'admission',
  'bahir-dar',
  'Bahir Dar University',
  '2026-07-15 23:59:59',
  ARRAY['undergraduate', 'admission', '2026', 'application'],
  true,
  true
);

-- Sample 3: Event Announcement
INSERT INTO public.news_posts (
  title,
  content,
  summary,
  category,
  "universityId",
  "universityName",
  "eventDate",
  tags,
  featured,
  published
) VALUES (
  'Annual Research Conference 2026',
  'Jimma University invites researchers, students, and academics to participate in our Annual Research Conference. This year''s theme is "Innovation and Sustainability in African Higher Education."

Conference Highlights:
- Keynote speeches by renowned scholars
- 50+ research presentations
- Panel discussions
- Networking opportunities
- Exhibition of research projects

Who Should Attend:
- University faculty and researchers
- Graduate students
- Industry professionals
- Policy makers

Registration is free for students and 500 ETB for professionals. Early bird registration ends May 15, 2026.',
  'Join us for the Annual Research Conference on Innovation and Sustainability',
  'event',
  'jimma',
  'Jimma University',
  '2026-06-20 09:00:00',
  ARRAY['conference', 'research', 'innovation', 'networking'],
  false,
  true
);

-- Sample 4: Deadline Reminder
INSERT INTO public.news_posts (
  title,
  content,
  summary,
  category,
  "universityId",
  "universityName",
  deadline,
  tags,
  featured,
  published
) VALUES (
  'Final Reminder: Course Registration Deadline',
  'This is a final reminder that course registration for Semester II of the 2025/2026 academic year closes on May 10, 2026.

Important Information:
- Registration is done online through the student portal
- Late registration incurs a penalty fee of 200 ETB
- Students must clear all financial obligations before registration
- Minimum credit hours: 12, Maximum: 21

Steps to Register:
1. Log in to student portal
2. Check your academic status
3. Select courses from available list
4. Submit registration
5. Print confirmation

For technical support, contact the IT helpdesk at ict@haramaya.edu.et',
  'Course registration closes May 10. Register now to avoid penalties!',
  'deadline',
  'haramaya',
  'Haramaya University',
  '2026-05-10 23:59:59',
  ARRAY['registration', 'courses', 'semester', 'deadline'],
  false,
  true
);

-- Sample 5: General Announcement
INSERT INTO public.news_posts (
  title,
  content,
  summary,
  category,
  "universityId",
  "universityName",
  tags,
  featured,
  published
) VALUES (
  'New Library Resources Available',
  'The University Library is excited to announce the addition of new digital resources to support your academic journey.

New Resources Include:
- 10,000+ e-books across all disciplines
- Access to JSTOR and ScienceDirect databases
- Online research tools and citation managers
- Virtual study rooms for group work

How to Access:
- Use your student ID and password
- Access from anywhere on campus
- Remote access available via VPN

Library Hours:
- Monday-Friday: 7:00 AM - 10:00 PM
- Saturday: 8:00 AM - 6:00 PM
- Sunday: Closed

Visit the library website for tutorials on using these resources effectively.',
  'Access thousands of new e-books and research databases',
  'announcement',
  'mekelle',
  'Mekelle University',
  ARRAY['library', 'resources', 'ebooks', 'research'],
  false,
  true
);

-- Sample 6: Scholarship (International)
INSERT INTO public.news_posts (
  title,
  content,
  summary,
  category,
  "universityId",
  "universityName",
  deadline,
  tags,
  featured,
  published,
  "externalLink"
) VALUES (
  'Erasmus+ Scholarship for European Universities',
  'The Erasmus+ program offers scholarships for Ethiopian students to study at partner universities in Europe for one or two semesters.

Benefits:
- Full tuition waiver
- Monthly allowance (€800-€1000)
- Travel grant
- Insurance coverage

Eligible Students:
- Currently enrolled undergraduate or graduate students
- CGPA of 3.0 or higher
- Good English proficiency (IELTS 6.0 or equivalent)

Partner Universities:
- Universities in Germany, France, Italy, Spain, and more
- Wide range of programs available

Application Process:
1. Apply through your university''s international office
2. Submit academic transcripts and language certificate
3. Write motivation letter
4. Attend interview

For more information and to apply, visit the Erasmus+ website or contact the International Relations Office.',
  'Study in Europe with full scholarship through Erasmus+ program',
  'scholarship',
  'aau',
  'Addis Ababa University',
  '2026-05-30 23:59:59',
  ARRAY['international', 'erasmus', 'europe', 'exchange'],
  true,
  true,
  'https://erasmus-plus.ec.europa.eu/'
);

-- Sample 7: Event (Career Fair)
INSERT INTO public.news_posts (
  title,
  content,
  summary,
  category,
  "universityId",
  "universityName",
  "eventDate",
  tags,
  featured,
  published
) VALUES (
  'Annual Career Fair 2026',
  'Connect with top employers at our Annual Career Fair! Over 50 companies will be recruiting for internships and full-time positions.

Participating Companies:
- Ethio Telecom
- Ethiopian Airlines
- Commercial Bank of Ethiopia
- Safaricom Ethiopia
- Tech startups and NGOs

Opportunities:
- Full-time positions
- Internships
- Graduate trainee programs
- Networking with industry professionals

What to Bring:
- Multiple copies of your CV
- Professional attire
- Portfolio (for relevant fields)
- Positive attitude!

Preparation Tips:
- Research companies beforehand
- Prepare your elevator pitch
- Practice common interview questions
- Bring a notebook for contacts

Don''t miss this opportunity to launch your career!',
  'Meet 50+ employers and explore job opportunities at the Career Fair',
  'event',
  'hawassa',
  'Hawassa University',
  '2026-05-25 09:00:00',
  ARRAY['career', 'jobs', 'internship', 'recruitment'],
  true,
  true
);

-- Verify the data was inserted
SELECT 
  title, 
  category, 
  "universityName", 
  featured,
  deadline,
  "eventDate"
FROM public.news_posts
ORDER BY "createdAt" DESC;
