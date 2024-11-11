type PendingGoalsType = {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completionCount: number;
}[];

export async function getPendingGoals(
  userId: string
): Promise<PendingGoalsType> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/pending-goals`,
    {
      headers: {
        authorization: `Bearer ${userId}`,
      },
    }
  );

  const data = await response.json();
  return data;
}
