"use client";

import { Root as LabelPrimitiveRoot } from "@radix-ui/react-label";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
    type ComponentPropsWithoutRef,
    type ComponentRef,
    forwardRef,
} from "react";

const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = forwardRef<
    ComponentRef<typeof LabelPrimitiveRoot>,
    ComponentPropsWithoutRef<typeof LabelPrimitiveRoot> &
        VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
    <LabelPrimitiveRoot
        ref={ref}
        className={cn(labelVariants(), className)}
        {...props}
    />
));
Label.displayName = LabelPrimitiveRoot.displayName;

export { Label };
