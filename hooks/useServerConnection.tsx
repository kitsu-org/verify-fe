"use client";

import { useEffect, useState } from "react";

export enum MessageTypes {
    StripeCode = "stripecode",
    Identify = "identify",
    Identification = "identification",
}

type MessageStructure = {
    type: string;
    data: unknown;
};

export interface IdentificationMessage extends MessageStructure {
    type: MessageTypes.Identification;
    data: {
        // Conditional: The user has the change for verification
        // Permanent: The user has lost the ability to appeal
        // None: No record on file / already done.
        username: string;
        banType: "conditional" | "permanent" | "none";
    }
}

export interface IdentifyMessage extends MessageStructure {
    type: MessageTypes.Identify;
    data: {
        userId: string;
    }
}

interface StripeCode extends MessageStructure {
    type: MessageTypes.StripeCode;
    data: string;
}

type WebSocketMessage = StripeCode;

export const useServerConnection = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const onMessageType = (
        type: MessageTypes,
        callback: (data: WebSocketMessage["data"]) => void,
    ) => {
        if (!socket) {
            return;
        }

        socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);

            if (message.type === type) {
                callback(message.data);
            }
        });
    };

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
            throw new TypeError(
                "The NEXT_PUBLIC_API_URL environment variable is not set.",
            );
        }

        const url = new URL(apiUrl);

        url.searchParams.set("identity", "9v4i8kslu2");
        setSocket(new WebSocket(url));
    }, []);

    return { socket, onMessageType };
};
