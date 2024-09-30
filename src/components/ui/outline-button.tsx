import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function OutlineButton(props: ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={twMerge(
        "flex items-center px-3 py-2 gap-2 leading-none rounded-full border border-dashed border-pink-500 text-sm text-zinc-300 hover:border-pink-800 transition duration-500 ease-in-out disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:border-pink-500 ring-pink-500/10 focus-visible:ring-4",
        "disabled:border-green-500",
        props.className
      )}
    />
  );
}
