-- =============================================================
-- CALLA CRM Middleware — Supabase Schema
-- =============================================================
-- Run this in Supabase SQL Editor (or psql) to create the tables
-- needed by wf_crm_middleware.json
-- =============================================================

-- Client configurations
-- Each row = one Calla client with their CRM details
CREATE TABLE IF NOT EXISTS client_configs (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name     text NOT NULL,
  vapi_assistant_ids text[] DEFAULT '{}',   -- VAPI assistant IDs for this client
  vapi_phone_numbers text[] DEFAULT '{}',   -- VAPI phone numbers for this client
  crm_type        text NOT NULL DEFAULT 'none'
                    CHECK (crm_type IN ('hubspot','salesforce','pipedrive','webhook','ghl','none')),
  crm_api_key     text,                     -- API key / access token for the CRM
  crm_base_url    text,                     -- Base URL override (e.g. custom Salesforce domain)
  crm_field_mapping jsonb DEFAULT '{}'::jsonb,
    -- Maps canonical VAPI field names to CRM-specific field names, e.g.:
    -- {
    --   "phone":        "Phone",
    --   "email":        "Email",
    --   "nombre":       "firstname",
    --   "resultado":    "hs_lead_status",
    --   "summary":      "description",
    --   "duration":     "call_duration__c"
    -- }
  notification_type   text DEFAULT 'none'
                        CHECK (notification_type IN ('slack','email','whatsapp','none')),
  notification_target text,                 -- Slack webhook URL, email address, or WhatsApp number
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

-- Index for fast lookup by assistant ID (GIN on array)
CREATE INDEX IF NOT EXISTS idx_client_configs_assistant_ids
  ON client_configs USING GIN (vapi_assistant_ids);

-- Index for fast lookup by phone number (GIN on array)
CREATE INDEX IF NOT EXISTS idx_client_configs_phone_numbers
  ON client_configs USING GIN (vapi_phone_numbers);

-- Call logs
-- One row per VAPI call processed by the middleware
CREATE TABLE IF NOT EXISTS call_logs (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       uuid REFERENCES client_configs(id) ON DELETE SET NULL,
  vapi_call_id    text NOT NULL,
  phone_number    text,
  duration_seconds float DEFAULT 0,
  resultado       text,
  structured_data jsonb DEFAULT '{}'::jsonb,
  summary         text,
  crm_pushed      boolean DEFAULT false,
  crm_response    jsonb,
  notification_sent boolean DEFAULT false,
  created_at      timestamptz DEFAULT now()
);

-- Unique on vapi_call_id so upserts are idempotent
CREATE UNIQUE INDEX IF NOT EXISTS idx_call_logs_vapi_call_id
  ON call_logs (vapi_call_id);

-- RLS policies (enable as needed)
-- ALTER TABLE client_configs ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE call_logs ENABLE ROW LEVEL SECURITY;
