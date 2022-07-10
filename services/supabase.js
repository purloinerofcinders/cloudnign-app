import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY
const supabaseJWTSecret = process.env.SUPABASE_JWT_SECRET

const jwt = require('jsonwebtoken');

export const supabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabaseService = (session) => {
  let packet = {
    data: null,
    service: null
  }

  try {
    packet.data = verifyToken(session?.access_token);
    packet.service = createClient(supabaseUrl, supabaseServiceKey);
  } catch (error) {
    packet.service = null;
  }

  return packet;
}

const verifyToken = (token) => {
  let result = jwt.verify(token, supabaseJWTSecret);

  return result;
}