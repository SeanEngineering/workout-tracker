
import type { Wellbeing } from "../db/models";
import { supabase } from "../lib/supabase/client";


export async function getWellbeing(): Promise<Wellbeing[]> {
  const { data, error } = await supabase
    .from("wellbeing")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;

  return data.map((w) => ({
    id: w.id,
    date: w.date,
    bodyWeight: w.body_weight,
    hoursSlept: w.hours_slept,
    restingHeartRate: w.resting_heart_rate,
    muscleMass: w.muscle_mass,
    fatMass: w.fat_mass
  }));
}

export async function upsertWellbeing(entry: Wellbeing) {
  const { data, error } = await supabase
    .from("wellbeing")
    .upsert({
      date: entry.date,
      body_weight: entry.bodyWeight,
      hours_slept: entry.hoursSlept,
      resting_heart_rate: entry.restingHeartRate,
      muscle_mass: entry.muscleMass,
      fat_mass: entry.fatMass
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}