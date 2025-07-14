-- Migration to add is_main column to project_images table
-- Run this in your Supabase SQL editor

-- Add the is_main column to project_images table
ALTER TABLE public.project_images 
ADD COLUMN is_main BOOLEAN DEFAULT false;

-- Update existing records to set the first image as main for each project
UPDATE public.project_images 
SET is_main = true 
WHERE id IN (
    SELECT DISTINCT ON (project_id) id 
    FROM public.project_images 
    ORDER BY project_id, "order" ASC
);

-- Add comment to document the column
COMMENT ON COLUMN public.project_images.is_main IS 'Indicates if this image is the main/featured image for the project';