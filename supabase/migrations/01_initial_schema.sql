-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  intent TEXT,
  company TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create agent_logs table for simulation tracking
CREATE TABLE IF NOT EXISTS agent_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  node_name TEXT NOT NULL,
  message TEXT,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies (Simplified for demo)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_logs ENABLE ROW LEVEL SECURITY;

-- Allow public insertion for lead capture
CREATE POLICY "Public insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert agent_logs" ON agent_logs FOR INSERT WITH CHECK (true);
