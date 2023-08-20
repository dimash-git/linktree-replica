import { cn } from "@/lib/utils";
import React from "react";

interface HeadingProps {
  title: string;
  className?: string;
}

const Heading = ({ title, className }: HeadingProps) => {
  return (
    <div
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl dark:text-white",
        className || null
      )}
    >
      {title}
    </div>
  );
};

export default Heading;
