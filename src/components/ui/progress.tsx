import { cn } from "@/lib/utils";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva } from "class-variance-authority";
import * as React from "react";

const progressVariants = cva(
  "relative overflow-hidden rounded-full bg-default-200",
  {
    variants: {
      color: {
        primary: "[&>div]:bg-primary",
        dark: "[&>div]:bg-foreground",
        destructive: "[&>div]:bg-destructive",
        warning: "[&>div]:bg-warning",
        info: "[&>div]:bg-info",
        success: "[&>div]:bg-success",
      },
      size: {
        xs: "h-1",
        sm: "h-2",
        md: "h-3",
        lg: " h-4",
        xl: "h-6",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "md",
    },
  },
);

const circleVariants = cva("[&_[path-color]]:text-default-200 ", {
  variants: {
    color: {
      primary: "[&_[bar-color]]:text-primary [&_[text-color]]:fill-primary",
      dark: "[&_[bar-color]]:text-foreground  [&_[text-color]]:fill-foreground",
      destructive:
        "[&_[bar-color]]:text-destructive [&_[text-color]]:fill-destructive",
      warning: "[&_[bar-color]]:text-warning [&_[text-color]]:fill-warning",
      info: "[&_[bar-color]]:text-info [&_[text-color]]:fill-info",
      success: "[&_[bar-color]]:text-success [&_[text-color]]:fill-success",
    },
    size: {
      xs: "h-12 w-12",
      sm: "h-14 w-14",
      md: "h-20 w-20",
      lg: " h-24 h-24",
      xl: "h-28 w-28",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});
interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  value?: number;
  showValue?: boolean;
  color?: "primary" | "dark" | "destructive" | "warning" | "info" | "success";
  isStripe?: boolean;
  isAnimate?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    { className, value, color, size, showValue, isStripe, isAnimate, ...props },
    ref,
  ) => {
    const stripeStyles = isStripe
      ? {
          backgroundImage: `linear-gradient(
          45deg,
          hsla(0, 0%, 100%, 0.15) 25%,
          transparent 0,
          transparent 50%,
          hsla(0, 0%, 100%, 0.15) 0,
          hsla(0, 0%, 100%, 0.15) 75%,
          transparent 0,
          transparent
        )`,
          backgroundSize: "0.857rem 0.857rem",
        }
      : {};
    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          progressVariants({ color, size }),

          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "flex h-full w-full flex-1 items-center justify-center transition-all",
            className,
            {
              "animate-stripes": isAnimate,
            },
          )}
          style={{
            transform: `translateX(-${100 - (value || 0)}%)`,
            ...stripeStyles,
          }}
        >
          {showValue && (
            <span className="text-primary-foreground block w-full pr-1 text-right text-[10px]">
              {value}%
            </span>
          )}
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    );
  },
);
Progress.displayName = ProgressPrimitive.Root.displayName;

interface CircularProgressProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  value?: number;
  showValue?: boolean;
  color?: "primary" | "dark" | "destructive" | "warning" | "info" | "success";
  isAnimate?: boolean;
  loading?: boolean;
  customContent?: React.ReactNode;
}

const CircularProgress = React.forwardRef<
  React.ForwardedRef<HTMLDivElement>,
  CircularProgressProps
>(
  ({
    className,
    value,
    color,
    size,
    showValue,
    loading,
    customContent,
    ...props
  }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const progress = circumference - (circumference * (value ?? 0)) / 100;

    return (
      <div className="relative">
        <svg
          className={cn(
            circleVariants({ color, size }),

            className,
            {
              "animate-spin": loading,
            },
          )}
          {...props}
          viewBox="0 0 100 100"
        >
          <circle
            path-color=""
            className="stroke-current"
            strokeWidth="10"
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
          ></circle>

          <circle
            bar-color=""
            className="stroke-current"
            strokeWidth="10"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            strokeDasharray={`${circumference}, ${circumference}`}
            strokeDashoffset={progress}
            style={{
              transition: "stroke-dashoffset 0.35s",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          ></circle>
          {showValue && !loading && (
            <text
              x="50"
              y="50"
              fontSize="16"
              textAnchor="middle"
              alignmentBaseline="middle"
              text-color=""
            >
              {customContent ? customContent : value + `%`}
            </text>
          )}
        </svg>
      </div>
    );
  },
);
CircularProgress.displayName = ProgressPrimitive.Root.displayName;
export { CircularProgress, Progress };
