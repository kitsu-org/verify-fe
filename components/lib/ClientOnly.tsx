"use client";

import { useIsClient } from "@uidotdev/usehooks";
import type { FC, ReactNode } from "react";

export const ClientOnly: FC<{
    children: ReactNode;
    placeholder?: ReactNode;
}> = ({ children, placeholder }) => {
    const isClient = useIsClient();

    if (!isClient) {
        return placeholder || null;
    }

    return children;
};
