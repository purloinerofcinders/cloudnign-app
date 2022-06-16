import { supabaseServer } from "../../lib/supabase";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    let body = JSON.parse(req.body);

    try {
      const { data, error } = await supabaseServer
        .from('profiles')
        .select()
        .eq('company_id', body?.company_id);

      if (error) 
        throw error;

      res.status(200).json({ employees: data, error: null })
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default handler;