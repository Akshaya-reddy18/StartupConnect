-- Test Data for StartupConnect Platform
-- Run this in Supabase SQL Editor

-- First, let's add some additional skills that might be useful
INSERT INTO public.skills (name, category) VALUES
  ('TypeScript', 'Programming'),
  ('Vue.js', 'Frontend'),
  ('Angular', 'Frontend'),
  ('Express.js', 'Backend'),
  ('Django', 'Backend'),
  ('Flutter', 'Mobile'),
  ('React Native', 'Mobile'),
  ('AWS', 'Cloud'),
  ('Docker', 'DevOps'),
  ('Kubernetes', 'DevOps'),
  ('GraphQL', 'API'),
  ('REST API', 'API'),
  ('MongoDB', 'Database'),
  ('Redis', 'Database'),
  ('TensorFlow', 'AI/ML'),
  ('PyTorch', 'AI/ML'),
  ('Tableau', 'Analytics'),
  ('Power BI', 'Analytics'),
  ('Figma', 'Design'),
  ('Adobe XD', 'Design'),
  ('SEO', 'Marketing'),
  ('Content Marketing', 'Marketing'),
  ('Social Media Marketing', 'Marketing'),
  ('Google Analytics', 'Analytics'),
  ('Salesforce', 'CRM'),
  ('Agile', 'Management'),
  ('Scrum', 'Management'),
  ('Git', 'Version Control'),
  ('CI/CD', 'DevOps')
ON CONFLICT (name) DO NOTHING;

-- Create 10 Students with realistic profiles
-- Note: These are test users without actual auth.users entries
-- In a real scenario, you'd create auth.users first, then profiles

-- Student 1: Computer Science Student
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'student', 'Priya Sharma', 'priya.sharma@college.edu', 'Passionate CS student with expertise in React and Node.js. Looking for opportunities to work on real-world projects and gain industry experience.', 'Mumbai, India', 'https://github.com/priyasharma', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face');

-- Student 2: Data Science Student
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'student', 'Rahul Patel', 'rahul.patel@university.edu', 'Data science enthusiast with strong Python skills. Experienced in machine learning and data analysis. Eager to contribute to innovative projects.', 'Bangalore, India', 'https://linkedin.com/in/rahulpatel', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');

-- Student 3: UI/UX Design Student
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'student', 'Anjali Desai', 'anjali.desai@design.edu', 'Creative UI/UX designer with a passion for user-centered design. Skilled in Figma, Adobe XD, and prototyping. Looking for design opportunities.', 'Delhi, India', 'https://behance.net/anjalidesai', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face');

-- Student 4: Mobile Development Student
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'student', 'Arjun Singh', 'arjun.singh@tech.edu', 'Mobile app developer specializing in React Native and Flutter. Built several apps with 1000+ downloads. Seeking opportunities to work on innovative mobile solutions.', 'Hyderabad, India', 'https://github.com/arjunsingh', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face');

-- Student 5: Backend Development Student
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'student', 'Meera Iyer', 'meera.iyer@engineering.edu', 'Backend developer with expertise in Node.js, Python, and databases. Experienced in building scalable APIs and microservices. Looking for challenging backend roles.', 'Chennai, India', 'https://linkedin.com/in/meeraiyer', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face');

-- Student 6: Full Stack Student
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'student', 'Vikram Reddy', 'vikram.reddy@college.edu', 'Full-stack developer with experience in MERN stack and cloud technologies. Passionate about building end-to-end solutions. Seeking opportunities to work on impactful projects.', 'Pune, India', 'https://github.com/vikramreddy', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face');

-- Student 7: AI/ML Student
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'student', 'Zara Khan', 'zara.khan@ai.edu', 'AI/ML enthusiast with expertise in TensorFlow and PyTorch. Worked on computer vision and NLP projects. Looking for opportunities in AI/ML startups.', 'Kolkata, India', 'https://github.com/zarakhan', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face');

-- Student 8: DevOps Student
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'student', 'Aditya Verma', 'aditya.verma@tech.edu', 'DevOps engineer with experience in Docker, Kubernetes, and AWS. Passionate about automation and cloud infrastructure. Seeking DevOps opportunities.', 'Ahmedabad, India', 'https://linkedin.com/in/adityaverma', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');

-- Student 9: Marketing Student
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'student', 'Sneha Gupta', 'sneha.gupta@business.edu', 'Digital marketing specialist with expertise in SEO, social media marketing, and content creation. Experienced in growing online presence for brands. Looking for marketing opportunities.', 'Jaipur, India', 'https://linkedin.com/in/snehagupta', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face');

-- Student 10: Product Management Student
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'student', 'Rohan Mehta', 'rohan.mehta@mba.edu', 'Product management student with experience in user research, product strategy, and agile methodologies. Passionate about building products that solve real problems. Seeking PM opportunities.', 'Gurgaon, India', 'https://linkedin.com/in/rohanmehta', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face');

-- Create 10 Startups with realistic profiles
-- Startup 1: FinTech
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'startup', 'PayTech Solutions', 'hello@paytech.com', 'Revolutionizing digital payments with innovative fintech solutions. We build secure, scalable payment infrastructure for businesses of all sizes.', 'Mumbai, India', 'https://paytech.com', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop');

-- Startup 2: HealthTech
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'startup', 'HealthAI', 'contact@healthai.com', 'AI-powered healthcare platform that helps doctors diagnose diseases faster and more accurately. Making healthcare accessible to everyone.', 'Bangalore, India', 'https://healthai.com', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=150&h=150&fit=crop');

-- Startup 3: EdTech
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'startup', 'LearnSmart', 'hello@learnsmart.com', 'Personalized learning platform that adapts to each student\'s learning style. Making education more effective and engaging through technology.', 'Delhi, India', 'https://learnsmart.com', 'https://images.unsplash.com/photo-1523240798132-8751934af426?w=150&h=150&fit=crop');

-- Startup 4: E-commerce
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'startup', 'ShopLocal', 'contact@shoplocal.com', 'Connecting local artisans with global customers. We help small businesses reach wider audiences through our e-commerce platform.', 'Hyderabad, India', 'https://shoplocal.com', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=150&h=150&fit=crop');

-- Startup 5: Logistics
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'startup', 'LogiTech', 'hello@logitech.com', 'Optimizing supply chain and logistics with AI-powered route optimization and real-time tracking. Making deliveries faster and more efficient.', 'Chennai, India', 'https://logitech.com', 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=150&h=150&fit=crop');

-- Startup 6: SaaS
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'startup', 'CloudFlow', 'contact@cloudflow.com', 'No-code platform for building business applications. Empowering non-technical users to create powerful software solutions.', 'Pune, India', 'https://cloudflow.com', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=150&fit=crop');

-- Startup 7: AI/ML
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'startup', 'DataMind', 'hello@datamind.com', 'AI-powered data analytics platform that helps businesses make better decisions. Turning data into actionable insights.', 'Kolkata, India', 'https://datamind.com', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop');

-- Startup 8: Gaming
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'startup', 'GameStudio', 'contact@gamestudio.com', 'Creating immersive mobile games with cutting-edge technology. Building the next generation of gaming experiences.', 'Ahmedabad, India', 'https://gamestudio.com', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=150&h=150&fit=crop');

-- Startup 9: Renewable Energy
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'startup', 'GreenTech', 'hello@greentech.com', 'Developing sustainable energy solutions for a greener future. Making renewable energy accessible and affordable for everyone.', 'Jaipur, India', 'https://greentech.com', 'https://images.unsplash.com/photo-1473341304170-971d4b7d13c3?w=150&h=150&fit=crop');

-- Startup 10: Cybersecurity
INSERT INTO public.profiles (user_id, user_type, full_name, email, bio, location, website, avatar_url) VALUES
  (gen_random_uuid(), 'startup', 'SecureNet', 'contact@securenet.com', 'Protecting businesses from cyber threats with advanced security solutions. Making the digital world safer for everyone.', 'Gurgaon, India', 'https://securenet.com', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=150&h=150&fit=crop');

-- Now let's add some skills to students (we'll need to get the user_ids first)
-- This is a simplified version - in practice you'd need to get the actual user_ids

-- Add some sample gigs for the startups
-- Note: In a real scenario, you'd need the actual startup user_ids

-- Sample gigs (these would need actual startup user_ids)
-- INSERT INTO public.gigs (startup_id, title, description, requirements, stipend_amount, stipend_currency, location, is_remote, duration_weeks, status) VALUES
--   ('startup-user-id-1', 'React Developer Intern', 'Help us build the next generation of our payment platform using React and TypeScript.', 'React, TypeScript, Node.js', 25000, 'INR', 'Mumbai, India', true, 12, 'active'),
--   ('startup-user-id-2', 'Data Science Intern', 'Work on machine learning models for disease prediction and analysis.', 'Python, TensorFlow, SQL', 30000, 'INR', 'Bangalore, India', true, 16, 'active'),
--   ('startup-user-id-3', 'UI/UX Design Intern', 'Design user interfaces for our educational platform.', 'Figma, Adobe XD, User Research', 20000, 'INR', 'Delhi, India', true, 8, 'active');

-- Note: To properly test with gigs and applications, you would need to:
-- 1. Create actual auth.users entries first
-- 2. Use those user_ids in the profiles
-- 3. Use the startup user_ids to create gigs
-- 4. Use the student user_ids to create applications

-- For now, this gives you 10 students and 10 startups with realistic profiles
-- You can manually create some gigs and applications through the UI for testing 