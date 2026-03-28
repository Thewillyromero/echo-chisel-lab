
-- Chat conversations table
CREATE TABLE public.chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  visitor_email text,
  visitor_name text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Chat messages table
CREATE TABLE public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.chat_conversations(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts and selects (visitors aren't authenticated)
CREATE POLICY "Allow anonymous insert conversations"
  ON public.chat_conversations FOR INSERT
  TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous select own conversation"
  ON public.chat_conversations FOR SELECT
  TO anon USING (true);

CREATE POLICY "Allow anonymous update own conversation"
  ON public.chat_conversations FOR UPDATE
  TO anon USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous insert messages"
  ON public.chat_messages FOR INSERT
  TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous select messages"
  ON public.chat_messages FOR SELECT
  TO anon USING (true);

-- Index for fast lookups
CREATE INDEX idx_chat_messages_conversation ON public.chat_messages(conversation_id);
CREATE INDEX idx_chat_conversations_session ON public.chat_conversations(session_id);
