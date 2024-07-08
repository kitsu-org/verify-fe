"use client";

import {
    Fallback as AvatarPrimitiveFallback,
    Image as AvatarPrimitiveImage,
    Root as AvatarPrimitiveRoot,
} from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";
import {
    type ComponentPropsWithoutRef,
    type ComponentRef,
    forwardRef,
} from "react";

const Avatar = forwardRef<
    ComponentRef<typeof AvatarPrimitiveRoot>,
    ComponentPropsWithoutRef<typeof AvatarPrimitiveRoot>
>(({ className, ...props }, ref) => (
    <AvatarPrimitiveRoot
        ref={ref}
        className={cn(
            "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
            className,
        )}
        {...props}
    />
));
Avatar.displayName = AvatarPrimitiveRoot.displayName;

const AvatarImage = forwardRef<
    ComponentRef<typeof AvatarPrimitiveImage>,
    ComponentPropsWithoutRef<typeof AvatarPrimitiveImage>
>(({ className, ...props }, ref) => (
    <AvatarPrimitiveImage
        ref={ref}
        className={cn("aspect-square h-full w-full", className)}
        {...props}
    />
));
AvatarImage.displayName = AvatarPrimitiveImage.displayName;

const AvatarFallback = forwardRef<
    ComponentRef<typeof AvatarPrimitiveFallback>,
    ComponentPropsWithoutRef<typeof AvatarPrimitiveFallback>
>(({ className, ...props }, ref) => (
    <AvatarPrimitiveFallback
        ref={ref}
        className={cn(
            "flex h-full w-full items-center justify-center rounded-full bg-muted",
            className,
        )}
        {...props}
    />
));
AvatarFallback.displayName = AvatarPrimitiveFallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
