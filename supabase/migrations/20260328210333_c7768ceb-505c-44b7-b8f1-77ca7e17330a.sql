
-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contact_leads;

-- Add database-level constraints for data integrity
ALTER TABLE public.contact_leads
  ADD CONSTRAINT contact_leads_name_length CHECK (char_length(name) <= 100),
  ADD CONSTRAINT contact_leads_email_length CHECK (char_length(email) <= 255),
  ADD CONSTRAINT contact_leads_message_length CHECK (char_length(message) <= 2000);
