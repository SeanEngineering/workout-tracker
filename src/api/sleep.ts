import { supabase } from "../lib/supabase/client";
import type { Sleep } from "../db/models";

export async function getSleep(): Promise<Sleep[]> {
  const { data, error } = await supabase
    .from("sleep")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;

  return data;
}

export async function upsertSleep(sleep: Sleep) {
  const { data, error } = await supabase
    .from("sleep")
    .upsert({
      date: sleep.date,
      hours_slept: sleep.hoursSlept
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}