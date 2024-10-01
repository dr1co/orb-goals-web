interface CreateGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}

export async function postGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  await fetch(`${import.meta.env.VITE_API_URL}/goals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency,
    }),
  });
}
