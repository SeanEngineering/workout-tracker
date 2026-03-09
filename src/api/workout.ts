import { supabase } from "../lib/supabase/client";
import type { Workout } from "../db/models";

export async function getWorkouts(): Promise<Workout[]> {
  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;

  return data.map((w) => ({
    id: w.id,
    date: w.date,
    durationMinutes: w.duration_minutes,
    bodyWeight: w.body_weight,
    sessionRpe: w.session_rpe,
    notes: w.notes,
    category: w.category,
    avgHeartRate: w.avg_heart_rate,
    maxHeartRate: w.max_heart_rate
  }));
}

export async function createWorkout(workout: Workout) {
  const { data, error } = await supabase
    .from("workouts")
    .insert({
      date: workout.date,
      duration_minutes: workout.durationMinutes,
      session_rpe: workout.sessionRpe,
      notes: workout.notes,
      category: workout.category,
      avg_heart_rate: workout.avgHeartRate,
      max_heart_rate: workout.maxHeartRate
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}