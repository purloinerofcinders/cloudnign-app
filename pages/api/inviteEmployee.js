import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1bXRodGV4c3djZG56Y3NwaWFlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1NDMyODM1NywiZXhwIjoxOTY5OTA0MzU3fQ.BfJkDjbH0ov7aN_rAIKET-CA-gpjKgqA-yhtSkzS-kQ';

const supabase = createClient(supabaseUrl, serviceKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { data: user, error } = await supabase.auth
        .api
        .inviteUserByEmail(req?.body);

      if (error) throw error;

      res.status(200).json({ user: user, error: null })
    } catch (error) {
      res.status(500).json({error: error});
      return;
    }
  }
}
