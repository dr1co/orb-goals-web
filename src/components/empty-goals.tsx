import { Plus } from "lucide-react";

import logo from "../assets/galaxy.png";
import hourglass from "../assets/hourglass.svg";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";

export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <div className="flex items-center justify-center gap-4">
        <img src={logo} alt="Orb.goals Logo" className="w-10 h-10" />
        <h1 className="text-3xl font-bold"> Orb.goals </h1>
      </div>

      <img src={hourglass} alt="Welcome" className="opacity-10 w-32" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        You have yet to register a new goal, why not do it now?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Register new goal
        </Button>
      </DialogTrigger>
    </div>
  );
}
