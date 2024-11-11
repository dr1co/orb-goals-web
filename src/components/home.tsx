import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Dialog } from "./ui/dialog";
import { CreateGoal } from "./create-goal";
import { EmptyGoals } from "./empty-goals";
import { Summary } from "./summary";
import { getSummary } from "../api/get-summary";
import { UserContext } from "../contexts/user";

export function Home() {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context.user.id) {
    navigate("/login");
  }

  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: () => getSummary(context.user.id),
    staleTime: 60000,
  });

  return (
    <Dialog>
      {data && data.total > 0 ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  );
}
