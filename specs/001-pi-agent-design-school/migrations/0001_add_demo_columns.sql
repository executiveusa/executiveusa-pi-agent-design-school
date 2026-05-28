-- Add demo URL columns to prompts table
-- Enables linking prompt detail pages to visual demonstration media

ALTER TABLE prompts ADD COLUMN IF NOT EXISTS demo_image_url TEXT;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS demo_video_url TEXT;

-- Index for efficient querying by demo presence
CREATE INDEX IF NOT EXISTS idx_prompts_demo_image_url ON prompts(demo_image_url)
WHERE demo_image_url IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_prompts_demo_video_url ON prompts(demo_video_url)
WHERE demo_video_url IS NOT NULL;
