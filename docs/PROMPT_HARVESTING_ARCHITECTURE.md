# Prompt Harvesting & Demo Gallery Architecture

## Overview

The PI Agent Design School now includes a complete prompt harvesting pipeline and visual demonstration system. This enables both human visitors and AI agents to discover what the school teaches through real prompts and visual examples.

## Components

### 1. Prompt Harvesting Pipeline (`packages/legacy-ingestor/`)

#### Crawler (`crawler.ts`)
- Polite rate-limited HTTP crawler (1 request/second)
- Extracts detail URLs from listing pages
- Handles pagination automatically
- Exponential backoff on network errors
- Tracks visited URLs to prevent re-fetching

**Usage:**
```typescript
const crawler = new Seedance2PromptCrawler();
const listingPages = await crawler.crawlListings(1, 10); // Fetch first 10 pages
const detailUrls = crawler.extractDetailUrls(listingPages[0].html);
const detailPages = await crawler.crawlDetailPages(detailUrls);
```

#### Parser (`seedance-parser.ts`)
- Extracts structured data from prompt HTML
- Maps categories to track enum (Documentary → "documentary", etc.)
- Extracts structured fields via regex:
  - Shot type
  - Camera motion (as array)
  - Mood (as array)
  - Lighting (as array)
  - Subject (as array)

**Category-to-Track Mapping:**
- Documentary, Documentary Film → "documentary"
- Anime, Anime Scene → "anime"
- UGC, User-Generated → "ugc"
- Music Video → "music_video"
- Product Video, Product Showcase → "product_video"
- Brand, Brand Film → "brand_film"
- (unmapped) → "general"

#### Database Writer (`db-writer.ts`)
- Inserts parsed prompts into PostgreSQL
- Deduplication by content hash
- Manages related records:
  - `prompts` table: Main prompt data
  - `prompt_tags` table: Individual tags
  - `prompt_media_refs` table: Image/video references
- Returns insertion status (new vs. duplicate)

#### JSONL Exporter (`jsonl-exporter.ts`)
- Exports parsed prompts to JSONL format
- One JSON object per line
- Suitable for manual verification before DB insert
- Output: `data/seedance_prompts.jsonl`

#### Orchestration (`cli.ts`)
- Coordinates full pipeline:
  1. Crawl listing pages
  2. Extract detail URLs
  3. Crawl detail pages
  4. Parse each page
  5. Deduplicate
  6. Export to JSONL
  7. Insert to DB (live mode only)
- Dry-run mode: Steps 1-6 without DB writes
- Configurable page limits: `--max-pages=50`

**Execution:**
```bash
# Dry-run (testing only)
npm run ingest:dry-run

# Live mode (requires DATABASE_URL)
npm run ingest --max-pages=100
```

### 2. Demo Media System

#### Demo Generator (`demo-generator.ts`)
- Generates placeholder SVG images for each track
- SVGs include:
  - Track-specific color scheme
  - Descriptive text
  - Visual hierarchy (circle, text sizing)
  - Watermark indicating placeholder status
- Output: `public/demos/images/{track}-demo.svg`

**Tracks Covered:**
- Documentary
- Anime Scene
- UGC Content
- Music Video
- Product Video
- Brand Film

#### Database Schema Updates
- Added `demo_image_url TEXT` column to `prompts` table
- Added `demo_video_url TEXT` column to `prompts` table
- Added indexes for efficient filtering by demo presence
- Migration: `specs/001-pi-agent-design-school/migrations/0001_add_demo_columns.sql`

### 3. Public UI

#### Demo Showcase Page (`app/(public)/showcase/page.tsx`)
- Human-friendly gallery of all track demonstrations
- Features:
  - Hero section explaining what the school teaches
  - Grid layout with track demonstrations
  - Call-to-action to explore tracks
  - API documentation section
  - Machine-readable endpoint documentation

#### Demo Components (`app/components/demo-showcase.tsx`)
- `<DemoShowcase />`: Individual demo card with:
  - Track badge
  - Title and description
  - Image or video player
  - Media type indicator
  - Synthia-style design (dark theme, hover effects)
  
- `<DemoGrid />`: Container for multiple demos:
  - Responsive grid (1/2/3 columns)
  - Featured first item (larger size)
  - Section title and subtitle
  - Auto-rows for flexible layout

**Styling:**
- Synthia SuperDesign system
- Dark background gradient (slate-950 → slate-900)
- Blue/purple accents
- Premium typography (font-bold, text-xl)
- Smooth hover transitions
- Responsive padding (px-4 mobile → px-8 desktop)

### 4. Agent-Readable APIs

#### `/api/demos`
- Discover all track demonstrations
- Supports filtering by track: `?track=documentary`
- Supports format selection: `?format=jsonl` for JSONL export
- Response includes:
  - Track metadata
  - Demo image/video URLs
  - Link to track course
  - Link to showcase page

#### `/api/prompts` (Enhanced)
- All prompt responses now include:
  - `demo_image_url`: Track-specific demo image
  - `demo_video_url`: Track-specific demo video (optional)
- Helps agents understand output quality expectations

#### `/api/catalog` (Enhanced)
- Track objects now include:
  - `demo_image_url`
  - `demo_video_url`
  - `description` (human-readable)
- Added `/api/demos` to `machine_readable_endpoints`

#### `/llms.txt` (Enhanced)
- New "Demo & Showcase" section
- Documents demo fields and their meanings
- Usage examples for agents
- Lists all demo-related endpoints

#### `/agents.json` (Enhanced)
- Added `demo-gallery` capability
- Each track includes:
  - `demo_image_url`: Public demo asset URL
  - `demo_showcase_url`: Link to showcase page
- Updated discovery section with `/api/demos` and `/showcase` URLs

## Data Flow

```
Seedance2Prompt.com
        ↓
   Crawler (crawler.ts)
        ↓
   Listing Pages HTML
        ↓
   URL Extraction → Detail URLs
        ↓
   Crawl Detail Pages
        ↓
   Detail HTML
        ↓
   Parser (seedance-parser.ts)
   ├→ Extract title, body
   ├→ Extract categories → Map to track
   ├→ Extract structured fields
   └→ Extract media (images, videos)
        ↓
   ParsedPrompt
        ↓
   DedupStore (memory check)
        ↓
   JSONL Export (data/seedance_prompts.jsonl)
        ↓
   [Manual Verification]
        ↓
   Database Writer (db-writer.ts)
        ├→ prompts table
        ├→ prompt_tags table
        └→ prompt_media_refs table
```

## Testing

### Test Coverage
- **Crawler tests**: URL extraction, pagination, visited tracking
- **Parser tests**: Category mapping, field extraction for all tracks
- **Database tests**: Insert, deduplication, media management
- **JSONL tests**: Format validation, object integrity
- **API tests**: Demo data structure, filtering, format conversions
- **Integration tests**: Full pipeline end-to-end

### Running Tests
```bash
npm run test                          # Run all tests
npm run test -- packages/legacy-ingestor/
npm run test -- app/api/demos/demo-api.test.ts
```

**Current Status: 64/64 tests passing**

## Safety & Security

1. **No Secrets**: All URLs hardcoded as safe public paths
2. **No Real Copyrighted Content**: Uses SVG placeholders for demo media
3. **Deduplication**: Database constraints prevent duplicate prompts
4. **Dry-Run Mode**: Test pipeline without DB writes
5. **Manual Verification**: JSONL export for review before insertion
6. **Rate Limiting**: Polite crawler respects server load (1 req/sec)
7. **Access Control**: Demo galleries are public read-only

## Configuration

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (for live ingest mode)

### Command-Line Options
- `--dry-run`: Test mode without DB writes
- `--max-pages=N`: Maximum listing pages to crawl (default: 10)

### Category Mapping
Currently hardcoded in `seedance-parser.ts`. To customize:
```typescript
const CATEGORY_TO_TRACK = {
  documentary: "documentary",
  anime: "anime",
  // ... add your mappings
};
```

## Future Enhancements

1. **Real Demo Media**: Replace SVG placeholders with actual images/videos
2. **Dynamic Categories**: Load category-to-track mapping from config file
3. **Incremental Ingest**: Track last-fetched timestamp to only import new/updated prompts
4. **Media Processing**: Optimize demo images/videos, generate thumbnails
5. **Semantic Search**: Use embeddings for prompt similarity discovery
6. **Agent Feedback**: Track which demos agents find most useful
7. **Multi-Source**: Support harvesting from multiple prompt libraries

## Deployment

### Development
```bash
# Test the pipeline with fixtures
npm run test -- packages/legacy-ingestor/

# Run dry-run against live Seedance2Prompt
npm run ingest:dry-run

# Inspect JSONL output
cat data/seedance_prompts.jsonl | jq .
```

### Production
1. Set `DATABASE_URL` to production PostgreSQL
2. Run migrations: `psql $DATABASE_URL < specs/001-pi-agent-design-school/migrations/0001_add_demo_columns.sql`
3. Execute ingest: `npm run ingest --max-pages=1000`
4. Verify: Check `/api/demos` endpoint for prompt count

### Vercel Deployment
- All assets in `public/demos/` are automatically served
- API endpoints are available at production domain
- Showcase page accessible at `/showcase`

## Monitoring

**Health Checks:**
```bash
# Check demo count
curl https://piagentdesignschool.com/api/catalog | jq '.courses'

# Verify demo URLs
curl https://piagentdesignschool.com/api/demos | jq '.demos[0].demo_image_url'

# Browse showcase
curl https://piagentdesignschool.com/showcase
```

**Logs:**
- Ingest logs: Run directly (stdout)
- API usage: Vercel edge function logs
- Database queries: Enable Drizzle debug with `DEBUG=drizzle:*`
