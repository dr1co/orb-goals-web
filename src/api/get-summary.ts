type SummaryType = {
  completed: number;
  total: number;
  goalsPerDay: Record<
    string,
    {
      id: string;
      title: string;
      completedAt: string;
    }[]
  >;
};

export async function getSummary(): Promise<SummaryType> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/summary`);
  const data = await response.json();

  return data;
}
