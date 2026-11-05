PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  product_url TEXT NOT NULL,
  image_url TEXT,
  price_text TEXT,
  description TEXT,
  affiliate_url TEXT,
  source TEXT NOT NULL DEFAULT 'manual',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  product_id TEXT,
  product_title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  provider TEXT,
  script_text TEXT,
  caption_text TEXT,
  storyboard_json TEXT,
  video_key TEXT,
  video_url TEXT,
  scheduled_at TEXT,
  post_url TEXT,
  affiliate_url TEXT,
  error_code TEXT,
  error_message TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_scheduled_at ON jobs(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
