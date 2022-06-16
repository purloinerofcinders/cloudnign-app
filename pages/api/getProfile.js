import { supabaseServer } from "../../lib/supabase";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    let body = JSON.parse(req.body);

    try {
      const { data, error } = await supabaseServer
        .from('profiles')
        .select()
        .eq('id', body?.userID).single();

      if (error) 
        throw error;

      res.status(200).json({ profile: data, error: null })
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default handler;