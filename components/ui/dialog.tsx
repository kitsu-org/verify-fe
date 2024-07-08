"use client";

import {
    Close as DialogPrimitiveClose,
    Content as DialogPrimitiveContent,
    Description as DialogPrimitiveDescription,
    Overlay as DialogPrimitiveOverlay,
    Portal as DialogPrimitivePortal,
    Root as DialogPrimitiveRoot,
    Title as DialogPrimitiveTitle,
    Trigger as DialogPrimitiveTrigger,
} from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import {
    type ComponentPropsWithoutRef,
    type ComponentRef,
    type HTMLAttributes,
    forwardRef,
} from "react";

const Dialog = DialogPrimitiveRoot;

const DialogTrigger = DialogPrimitiveTrigger;

const DialogPortal = DialogPrimitivePortal;

const DialogClose = DialogPrimitiveClose;

const DialogOverlay = forwardRef<
    ComponentRef<typeof DialogPrimitiveOverlay>,
    ComponentPropsWithoutRef<typeof DialogPrimitiveOverlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitiveOverlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className,
        )}
        {...props}
    />
));
DialogOverlay.displayName = DialogPrimitiveOverlay.displayName;

const DialogContent = forwardRef<
    ComponentRef<typeof DialogPrimitiveContent>,
    ComponentPropsWithoutRef<typeof DialogPrimitiveContent>
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitiveContent
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                className,
            )}
            {...props}
        >
            {children}
        </DialogPrimitiveContent>
    </DialogPortal>
));
DialogContent.displayName = DialogPrimitiveContent.displayName;

const DialogHeader = ({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className,
        )}
        {...props}
    />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className,
        )}
        {...props}
    />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = forwardRef<
    ComponentRef<typeof DialogPrimitiveTitle>,
    ComponentPropsWithoutRef<typeof DialogPrimitiveTitle>
>(({ className, ...props }, ref) => (
    <DialogPrimitiveTitle
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className,
        )}
        {...props}
    />
));
DialogTitle.displayName = DialogPrimitiveTitle.displayName;

const DialogDescription = forwardRef<
    ComponentRef<typeof DialogPrimitiveDescription>,
    ComponentPropsWithoutRef<typeof DialogPrimitiveDescription>
>(({ className, ...props }, ref) => (
    <DialogPrimitiveDescription
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));
DialogDescription.displayName = DialogPrimitiveDescription.displayName;

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
};
