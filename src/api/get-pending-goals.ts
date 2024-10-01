type PendingGoalsType = {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completionCount: number;
}[];

export async function getPendingGoals(): Promise<PendingGoalsType> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/pending-goals`);
  const data = response.json();

  return data;
}
