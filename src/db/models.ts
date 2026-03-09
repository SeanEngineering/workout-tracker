export interface Workout {
  id?: number;
  date: string;
  durationMinutes?: number;
  sessionRpe?: number;
  notes?: string;
  category?: string;
  avgHeartRate?: number;
  maxHeartRate?: number;
}

export interface Exercise {
  id?: number;
  name: string;
  category?: string;
}

export interface Set {
  id?: number;
  workoutId: number;
  exerciseId: number;
  reps?: number;
  weight?: number;
  distance?: number;
  timeSeconds?: number;
  setCount?: number;
}

export interface Wellbeing {
  id?: number;
  date: string;
  bodyWeight?: number;
  hoursSlept?: number;
  restingHeartRate?: number;
  muscleMass?: number;
  fatMass?: number;
}