import { Plus } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { OutlineButton } from "./ui/outline-button";
import { getPendingGoals } from "../api/get-pending-goals";
import { postGoalCompletion } from "../api/post-goal-completion";

export function PendingGoals() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: getPendingGoals,
    staleTime: 60000,
  });

  if (!data) {
    return null;
  }

  async function handleCompleteGoal(goalId: string) {
    await postGoalCompletion(goalId);

    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map((goal) => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        );
      })}
    </div>
  );
}
