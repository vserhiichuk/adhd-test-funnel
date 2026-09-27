import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("w-full px-4 sm:px-6 lg:px-[70px]", className)} {...props} />;
}
