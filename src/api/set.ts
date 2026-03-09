import { supabase } from "../lib/supabase/client";
import type { Set } from "../db/models";

export async function getSets(workoutId: number): Promise<Set[]> {
  const { data, error } = await supabase
    .from("sets")
    .select("*")
    .eq("workout_id", workoutId);

  if (error) throw error;

  return data.map((s) => ({
    id: s.id,
    workoutId: s.workout_id,
    exerciseId: s.exercise_id,
    reps: s.reps,
    weight: s.weight,
    distance: s.distance,
    timeSeconds: s.time_seconds
  }));
}

export async function createSets(sets: Set[]) {
  const { data, error } = await supabase
    .from("sets")
    .insert(
      sets.map((s) => ({
        workout_id: s.workoutId,
        exercise_id: s.exerciseId,
        reps: s.reps,
        weight: s.weight,
        distance: s.distance,
        time_seconds: s.timeSeconds,
        set_count: s.setCount
      }))
    );

  if (error) throw error;

  return data;
}