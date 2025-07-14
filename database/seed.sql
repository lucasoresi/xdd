-- Insertar tecnologías
INSERT INTO public.technologies (name, slug, icon, created_at) VALUES
('React', 'react', 'ri-reactjs-line', NOW()),
('Node.js', 'nodejs', 'ri-nodejs-line', NOW()),
('Express', 'express', 'ri-code-s-slash-line', NOW()),
('PostgreSQL', 'postgresql', 'ri-database-2-line', NOW()),
('JavaScript', 'javascript', 'ri-javascript-line', NOW()),
('TypeScript', 'typescript', 'ri-typescript-line', NOW()),
('HTML5', 'html5', 'ri-html5-line', NOW()),
('CSS3', 'css3', 'ri-css3-line', NOW()),
('Tailwind CSS', 'tailwind-css', 'ri-tailwind-css-line', NOW()),
('Git', 'git', 'ri-git-branch-line', NOW());

-- Insertar perfiles de usuario
-- Nota: Asegúrate de que el ID exista en tu tabla de autenticación de Supabase
INSERT INTO public.profiles (id, username, full_name, avatar_url, bio, website, created_at, updated_at) VALUES
('00000000-0000-0000-0000-000000000001', 'admin', 'Administrador', 'https://ui-avatars.com/api/?name=Admin&background=random', 'Administrador del sistema', 'https://ejemplo.com', NOW(), NOW()),
('00000000-0000-0000-0000-000000000002', 'johndoe', 'John Doe', 'https://ui-avatars.com/api/?name=John+Doe&background=random', 'Desarrollador Full Stack', 'https://johndoe.dev', NOW(), NOW());

-- Insertar proyectos
-- Nota: Asegúrate de que el user_id exista en tu tabla de perfiles
INSERT INTO public.projects (
  user_id, title, slug, description, content, 
  featured_image, demo_url, repo_url, is_featured, 
  is_published, published_at, created_at, updated_at
) VALUES
(
  '00000000-0000-0000-0000-000000000001', 
  'Sistema de Gestión de Proyectos', 
  'sistema-gestion-proyectos',
  'Un sistema completo para la gestión de proyectos y tareas',
  'Contenido detallado del proyecto...',
  'https://via.placeholder.com/1200x630',
  'https://demo.ejemplo.com/project1',
  'https://github.com/ejemplo/project1',
  true,
  true,
  NOW(),
  NOW(),
  NOW()
),
(
  '00000000-0000-0000-0000-000000000002',
  'E-commerce React',
  'ecommerce-react',
  'Tienda en línea construida con React y Node.js',
  'Contenido detallado del proyecto...',
  'https://via.placeholder.com/1200x630',
  'https://demo.ejemplo.com/ecommerce',
  'https://github.com/ejemplo/ecommerce',
  true,
  true,
  NOW(),
  NOW(),
  NOW()
),
(
  '00000000-0000-0000-0000-000000000001',
  'API REST con Express',
  'api-rest-express',
  'API REST construida con Express y MongoDB',
  'Contenido detallado del proyecto...',
  'https://via.placeholder.com/1200x630',
  'https://demo.ejemplo.com/api-docs',
  'https://github.com/ejemplo/express-api',
  false,
  true,
  NOW(),
  NOW(),
  NOW()
);

-- Asociar tecnologías a proyectos
-- Proyecto 1: Sistema de Gestión de Proyectos
INSERT INTO public.project_technologies (project_id, technology_id, created_at) VALUES
(1, 1, NOW()), -- React
(1, 2, NOW()), -- Node.js
(1, 3, NOW()), -- Express
(1, 4, NOW()); -- PostgreSQL

-- Proyecto 2: E-commerce React
INSERT INTO public.project_technologies (project_id, technology_id, created_at) VALUES
(2, 1, NOW()), -- React
(2, 5, NOW()), -- JavaScript
(2, 7, NOW()), -- HTML5
(2, 8, NOW()); -- CSS3

-- Proyecto 3: API REST con Express
INSERT INTO public.project_technologies (project_id, technology_id, created_at) VALUES
(3, 2, NOW()), -- Node.js
(3, 3, NOW()), -- Express
(3, 6, NOW()); -- TypeScript

-- Insertar imágenes para los proyectos
-- Imágenes para el Proyecto 1
INSERT INTO public.project_images (project_id, url, alt_text, is_main, "order", created_at) VALUES
(1, 'https://via.placeholder.com/800x600/1', 'Captura de pantalla 1 del sistema de gestión', true, 1, NOW()),
(1, 'https://via.placeholder.com/800x600/2', 'Captura de pantalla 2 del sistema de gestión', false, 2, NOW());

-- Imágenes para el Proyecto 2
INSERT INTO public.project_images (project_id, url, alt_text, is_main, "order", created_at) VALUES
(2, 'https://via.placeholder.com/800x600/3', 'Página principal del e-commerce', true, 1, NOW()),
(2, 'https://via.placeholder.com/800x600/4', 'Carrito de compras', false, 2, NOW());

-- Imágenes para el Proyecto 3
INSERT INTO public.project_images (project_id, url, alt_text, is_main, "order", created_at) VALUES
(3, 'https://via.placeholder.com/800x600/5', 'Documentación de la API', true, 1, NOW());
