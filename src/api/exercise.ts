import { supabase } from "../lib/supabase/client";
import type { Exercise } from "../db/models";

export async function getExercises(): Promise<Exercise[]> {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .order("name");

  if (error) throw error;

  return data;
}

export async function createExercise(exercise: Exercise) {
  const { data, error } = await supabase
    .from("exercises")
    .insert({
      name: exercise.name,
      category: exercise.category
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}