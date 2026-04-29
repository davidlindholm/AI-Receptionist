-- Migration: add company_slug to leads + active_calls
--
-- Run this once in the Supabase SQL editor (or `psql` against the
-- production database). After this lands the per-company dashboards
-- can filter by company_slug instead of service_type, which fixes the
-- collision where Nimoz + Voltaberg (both service_type="El") were
-- showing each other's calls.
--
-- Historical leads are NOT backfilled — they keep company_slug = NULL
-- and remain visible only on the global /dashboard.

ALTER TABLE leads        ADD COLUMN IF NOT EXISTS company_slug text;
ALTER TABLE active_calls ADD COLUMN IF NOT EXISTS company_slug text;

CREATE INDEX IF NOT EXISTS leads_company_slug_idx
  ON leads (company_slug);
