import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "./ui/radio-group";
import { Button } from "./ui/button";
import { postGoal } from "../api/post-goal";
import { UserContext } from "../contexts/user";

const createGoalForm = z.object({
  title: z.string().min(1, "Enter the activity you want to do."),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

export function CreateGoal() {
  const context = useContext(UserContext);

  const queryClient = useQueryClient();

  const { register, control, handleSubmit, formState, reset } = useForm<
    z.infer<typeof createGoalForm>
  >({
    resolver: zodResolver(createGoalForm),
  });

  async function handleCreateGoal(data: z.infer<typeof createGoalForm>) {
    const userId = context.user.id;

    await postGoal({
      userId,
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    });

    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });

    reset();
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Register new goal</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Add activities that makes you feel well and you want to keep doing
            them every week
          </DialogDescription>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex flex-col justify-between flex-1"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">What is the activity?</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Workout, meditate... you choose!"
                {...register("title")}
              />

              {formState.errors.title && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="desiredWeeklyFrequency">
                How many times a week?
              </Label>

              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                defaultValue={1}
                render={({ field }) => {
                  return (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <RadioGroupItem value="1">
                        <RadioGroupIndicator />
                        <span className="text-yellow-50 text-sm font-medium leading-none">
                          Once a week
                        </span>
                      </RadioGroupItem>

                      <RadioGroupItem value="2">
                        <RadioGroupIndicator />
                        <span className="text-yellow-100 text-sm font-medium leading-none">
                          Twice a week
                        </span>
                      </RadioGroupItem>

                      <RadioGroupItem value="3">
                        <RadioGroupIndicator />
                        <span className="text-yellow-200 text-sm font-medium leading-none">
                          3x a week
                        </span>
                      </RadioGroupItem>

                      <RadioGroupItem value="4">
                        <RadioGroupIndicator />
                        <span className="text-yellow-300 text-sm font-medium leading-none">
                          4x a week
                        </span>
                      </RadioGroupItem>

                      <RadioGroupItem value="5">
                        <RadioGroupIndicator />
                        <span className="text-yellow-400 text-sm font-medium leading-none">
                          5x a week
                        </span>
                      </RadioGroupItem>

                      <RadioGroupItem value="6">
                        <RadioGroupIndicator />
                        <span className="text-yellow-500 text-sm font-medium leading-none">
                          6x a week
                        </span>
                      </RadioGroupItem>

                      <RadioGroupItem value="7">
                        <RadioGroupIndicator />
                        <span className="text-yellow-600 text-sm font-medium leading-none">
                          The full week!
                        </span>
                      </RadioGroupItem>
                    </RadioGroup>
                  );
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="flex-1">
                Close
              </Button>
            </DialogClose>
            <Button className="flex-1">Save</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
