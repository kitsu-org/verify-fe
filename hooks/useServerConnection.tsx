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
                callback(message.data.data);
            }
        });
    };

    useEffect(() => {
        setSocket(new WebSocket("/websockets"));
    }, []);

    return { socket, onMessageType };
};
