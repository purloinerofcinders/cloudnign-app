import { supabaseServer } from "../../lib/supabase";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { data: user, error } = await supabaseServer.auth.api
        .inviteUserByEmail(req?.body);

      if (error) 
        throw error;

      res.status(200).json({ user: user, error: null })
    } catch (error) {
      res.status(500).json({ error: error });

      return;
    }
  }
}

export default handler;