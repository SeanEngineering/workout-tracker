// pages/api/create-table.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  const { tableName } = req.body;

  const { error } = await supabase.rpc('execute_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id serial PRIMARY KEY,
        date date
      );
    `
  });

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ success: true });
}