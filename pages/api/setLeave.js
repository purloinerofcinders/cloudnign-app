import { supabaseService } from "../../services/supabase";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);

    const supabase = supabaseService(body?.session);
    const service = supabase?.service;
    const tokenData = supabase?.data;

    const tokenExpireDate = new Date(tokenData?.exp * 1000);

    // if (supabase === null || profile?.id !== tokenData?.sub) {
    //   res.status(500).json({error: 'UNAUTHORIZED'});
    //   return;
    // }

    if (tokenExpireDate < new Date) {
      res.status(500).json({error: 'TOKENEXPIRED'});
      return;
    }

    try {
      const { error } = await service
        .from('leaves')
        .update([{
          status: body?.new_status,
        }])
        .match({ 
          id: body?.id
        });

      if (error)
        throw error;

      res.status(200).json({ error: null });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default handler;