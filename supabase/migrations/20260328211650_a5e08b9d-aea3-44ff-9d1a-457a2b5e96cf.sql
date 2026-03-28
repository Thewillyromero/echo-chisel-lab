
-- Drop permissive policies - all writes will go through edge function with service role
DROP POLICY IF EXISTS "Allow anonymous insert conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Allow anonymous select own conversation" ON public.chat_conversations;
DROP POLICY IF EXISTS "Allow anonymous update own conversation" ON public.chat_conversations;
DROP POLICY IF EXISTS "Allow anonymous insert messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Allow anonymous select messages" ON public.chat_messages;
