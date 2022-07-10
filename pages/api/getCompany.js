import { supabaseService } from "../../services/supabase";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);
    const profile = body?.profile;

    const supabase = supabaseService(body?.session);
    const service = supabase?.service;
    const tokenData = supabase?.data;

    const tokenExpireDate = new Date(tokenData?.exp * 1000);

    if (supabase === null || profile?.id !== tokenData?.sub) {
      res.status(500).json({error: 'UNAUTHORIZED'});
      return;
    }

    if (tokenExpireDate < new Date) {
      res.status(500).json({error: 'TOKENEXPIRED'});
      return;
    }

    try {
      const { data, error } = await service
        .from('companies')
        .select()
        .eq('id', body?.company_id)
        .single();

      if (error) 
        throw error;

      res.status(200).json({ company: data, error: null })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default handler;