"use client";

import {
    Content as HoverCardPrimitiveContent,
    Root as HoverCardPrimitiveRoot,
    Trigger as HoverCardPrimitiveTrigger,
} from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";
import {
    type ComponentPropsWithoutRef,
    type ComponentRef,
    forwardRef,
} from "react";

const HoverCard = HoverCardPrimitiveRoot;

const HoverCardTrigger = HoverCardPrimitiveTrigger;

const HoverCardContent = forwardRef<
    ComponentRef<typeof HoverCardPrimitiveContent>,
    ComponentPropsWithoutRef<typeof HoverCardPrimitiveContent>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <HoverCardPrimitiveContent
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
            "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
        )}
        {...props}
    />
));
HoverCardContent.displayName = HoverCardPrimitiveContent.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
