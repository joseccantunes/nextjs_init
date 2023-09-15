import * as React from "react";
import { cn } from "@/app/_lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-walkaway-400 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-walkaway-500 text-walkaway-50 hover:bg-walkaway-600  ",
        cancel: "border border-walkaway-700 text-walkaway-700 hover:bg-walkaway-50",
        destructive: "bg-red-500 text-red-50 hover:bg-red-600",
        outline:
          "text-walkaway-800 hover:bg-walkaway-800 hover:text-walkaway-50 dark:text-walkaway-50 dark:hover:bg-walkaway-50 dark:hover:text-walkaway-800 outline outline-1 outline-walkaway-800",
        subtle: "text-walkaway-800 bg-walkaway-50 hover:bg-walkaway-200 dark:bg-walkaway-800 dark:text-walkaway-50 dark:hover:bg-walkaway-700",
        ghost:
          "hover:text-white data-[state=open]:bg-walkaway-800 data-[state=open]:text-walkaway-50 dark:text-walkaway-200 hover:bg-walkaway-600 dark:data-[state=open]:bg-walkaway-800",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline dark:text-walkaway-50 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        xs: "h-8 px-1.5 rounded-sm",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, children, variant, isLoading, size, ...props }, ref) => {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={isLoading} {...props}>
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
