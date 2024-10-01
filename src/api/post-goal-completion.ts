export async function postGoalCompletion(goalId: string) {
  await fetch(`${import.meta.env.VITE_API_URL}/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      goalId,
    }),
  });
}
