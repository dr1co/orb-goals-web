interface CreateGoalRequest {
  userId: string;
  title: string;
  desiredWeeklyFrequency: number;
}

export async function postGoal({
  userId,
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  await fetch(`${import.meta.env.VITE_API_URL}/goals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userId}`,
    },
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency,
    }),
  });
}
