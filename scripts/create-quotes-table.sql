CREATE TABLE IF NOT EXISTS quote_requests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50) NOT NULL,
  packaging_type VARCHAR(255) NOT NULL,
  quantity VARCHAR(100),
  message TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
