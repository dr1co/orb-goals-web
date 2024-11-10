import { useQuery } from "@tanstack/react-query";

import { Dialog } from "./ui/dialog";
import { CreateGoal } from "./create-goal";
import { EmptyGoals } from "./empty-goals";
import { Summary } from "./summary";
import { getSummary } from "../api/get-summary";

export function Home() {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 60000,
  });

  return (
    <Dialog>
      {data && data.total > 0 ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  );
}