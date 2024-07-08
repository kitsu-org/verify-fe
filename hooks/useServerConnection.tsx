"use client";

import { useEffect, useState } from "react";

export enum MessageTypes {
    StripeCode = "stripecode",
}

type MessageStructure = {
    type: string;
    data: unknown;
};

interface StripeCode extends MessageStructure {
    type: MessageTypes.StripeCode;
    data: string;
}

type WebSocketMessage = StripeCode;

export const useServerConnection = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        throw new TypeError(
            "The NEXT_PUBLIC_API_URL environment variable is not set.",
        );
    }

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
        const url = new URL(apiUrl);

        url.searchParams.set("identity", "9v4i8kslu2");
        setSocket(new WebSocket(url));
    }, [apiUrl]);

    return { socket, onMessageType };
};
