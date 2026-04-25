-- Sample Seed Data for Global Course Chat
-- Matches frontend IDs (aau, jimma, etc.)

-- 1. Insert Sample Universities
insert into public.universities (id, name, location) values
('aau', 'Addis Ababa University', 'Addis Ababa'),
('jimma', 'Jimma University', 'Jimma'),
('bahirdar', 'Bahir Dar University', 'Bahir Dar'),
('hawassa', 'Hawassa University', 'Hawassa'),
('mekelle', 'Mekelle University', 'Mekelle')
on conflict (id) do nothing;

-- 2. Insert Sample Courses
insert into public.courses (name, code, department, description) values
('Data Structures and Algorithms', 'CS201', 'Computer Science', 'Fundamentals of algorithms and data structure design.'),
('Introduction to Programming', 'CS101', 'Computer Science', 'Basics of programming using Python/C++.'),
('Database Systems', 'CS301', 'Computer Science', 'Relational databases, SQL, and database design.'),
('Operating Systems', 'CS302', 'Computer Science', 'Core concepts of OS including processes, memory, and file systems.'),
('Calculus I', 'MATH101', 'Mathematics', 'Differential and integral calculus.')
on conflict (code) do update set 
  name = excluded.name,
  department = excluded.department,
  description = excluded.description;

-- 3. Create Chat Rooms for each course
-- Global rooms
insert into public.chat_rooms ("courseId", type, name)
select id, 'global', 'Global Chat' from public.courses
on conflict ("courseId", "universityId", type) do nothing;

-- University-specific rooms for Addis Ababa University
insert into public.chat_rooms ("courseId", "universityId", type, name)
select c.id, u.id, 'university', u.name || ' Chat'
from public.courses c, public.universities u
where u.id = 'aau'
on conflict ("courseId", "universityId", type) do nothing;

-- University-specific rooms for Jimma University
insert into public.chat_rooms ("courseId", "universityId", type, name)
select c.id, u.id, 'university', u.name || ' Chat'
from public.courses c, public.universities u
where u.id = 'jimma'
on conflict ("courseId", "universityId", type) do nothing;
