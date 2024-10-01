import { CheckCircle2, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import logo from "../assets/galaxy.png";
import { DialogTrigger } from "./ui/dialog";
import { PendingGoals } from "./pending-goals";
import { Button } from "./ui/button";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { getSummary } from "../api/get-summary";

export function Summary() {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 60000,
  });

  if (!data) {
    return null;
  }

  const firstDayOfWeek = dayjs().startOf("week").format("MMM DD");
  const lastDayOfWeek = dayjs().endOf("week").format("MMM DD");

  const progress = Math.round((data?.completed * 100) / data?.total);

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Orb.goals Logo" className="w-8 h-8" />
          <span className="text-lg font-semibold">
            From {firstDayOfWeek} to {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Register new goal
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress max={data?.total} value={data?.completed}>
          <ProgressIndicator style={{ width: `${progress}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            You've completed{" "}
            <span className="text-zinc-100 font-bold">{data?.completed}</span>{" "}
            out of{" "}
            <span className="text-zinc-100 font-bold">{data?.total}</span> goals
            this week.
          </span>
          <span>{progress}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Your week</h2>

        {data.goalsPerDay
          ? Object.entries(data?.goalsPerDay).map(([date, goals]) => {
              const weekDay = dayjs(date).format("dddd");
              const formattedDate = dayjs(date).format("MMMM DD");

              return (
                <div key={date} className="flex flex-col gap-4">
                  <h3 className="font-medium capitalize">
                    {weekDay}{" "}
                    <span className="text-zinc-400 text-xs">
                      ({formattedDate})
                    </span>
                  </h3>

                  <ul className="flex flex-col gap-3">
                    {goals
                      ? goals.map((goal, index) => {
                          const time = dayjs(goal.completedAt).format("hh:mm");

                          return (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle2 className="size-4 text-pink-500" />
                              <span className="text-sm text-zinc-400">
                                You completed "
                                <span className="text-zinc-100">
                                  {goal.title}
                                </span>
                                " at{" "}
                                <span className="text-zinc-100">{time}</span> AM
                              </span>
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
