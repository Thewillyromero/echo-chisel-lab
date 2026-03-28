-- Add explicit deny policies for client-side access (edge functions use service role which bypasses RLS)

-- contact_leads: no direct client access
CREATE POLICY "Deny anonymous inserts on contact_leads"
ON public.contact_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "Deny anonymous selects on contact_leads"
ON public.contact_leads
FOR SELECT
TO anon, authenticated
USING (false);

CREATE POLICY "Deny anonymous updates on contact_leads"
ON public.contact_leads
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny anonymous deletes on contact_leads"
ON public.contact_leads
FOR DELETE
TO anon, authenticated
USING (false);

-- chat_conversations: no direct client access
CREATE POLICY "Deny client inserts on chat_conversations"
ON public.chat_conversations
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "Deny client selects on chat_conversations"
ON public.chat_conversations
FOR SELECT
TO anon, authenticated
USING (false);

-- chat_messages: no direct client access
CREATE POLICY "Deny client inserts on chat_messages"
ON public.chat_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "Deny client selects on chat_messages"
ON public.chat_messages
FOR SELECT
TO anon, authenticated
USING (false);