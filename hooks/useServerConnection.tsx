"use client";

import { env } from "next-runtime-env";
import { useEffect, useState } from "react";

export enum MessageTypes {
    StripeSession = "stripeSession",
    Identify = "identify",
    Identification = "identification",
    FailedIdentification = "failedIdentification",
    VerificationFailed = "verificationFailed",
    VerificationComplete = "verificationComplete",
    StripeCode = "stripeCode",
    VerificationCompleteStep = "verificationCompleteStep",
}

type MessageStructure = {
    type: MessageTypes;
    data: unknown;
};

export interface VerificationCompleteMessage extends MessageStructure {
    type: MessageTypes.VerificationComplete;
    data: { verificationId: string };
}

export interface VerificationCompleteStep extends MessageStructure {
    type: MessageTypes.VerificationCompleteStep;
    data: "redact" | "unban";
}

export interface VerificationFailedMessage extends MessageStructure {
    type: MessageTypes.VerificationFailed;
    data: { reason: string };
}

export interface FailedIdentification extends MessageStructure {
    type: MessageTypes.FailedIdentification;
    data: null;
}

export interface IdentificationMessage extends MessageStructure {
    type: MessageTypes.Identification;
    data: {
        // Conditional: The user has the change for verification
        // Permanent: The user has lost the ability to appeal
        // None: No record on file / already done.
        username: string;
        banType: "conditional" | "permanent" | "none";
    };
}

export interface IdentifyMessage extends MessageStructure {
    type: MessageTypes.Identify;
    data: {
        userId: string;
    };
}

interface StripeCode extends MessageStructure {
    type: MessageTypes.StripeCode;
    data: string;
}

interface StripeSession extends MessageStructure {
    type: MessageTypes.StripeSession;
    data: string;
}

type WebSocketMessage =
    | StripeCode
    | IdentifyMessage
    | IdentificationMessage
    | FailedIdentification
    | StripeSession
    | VerificationCompleteMessage
    | VerificationFailedMessage
    | VerificationCompleteStep;

export const useServerConnection = (identity: string) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const onMessageType = <T extends MessageTypes>(
        type: T,
        callback: (data: (WebSocketMessage & { type: T })["data"]) => void,
    ) => {
        if (!socket) {
            return;
        }

        socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data) as WebSocketMessage;

            if ((message.type as T) === type) {
                // I have no idea why it needs the `as never` cast.
                callback(message.data as never);
            }
        });
    };

    useEffect(() => {
        const apiUrl = env("NEXT_PUBLIC_API_URL");

        if (!apiUrl) {
            throw new TypeError(
                "The NEXT_PUBLIC_API_URL environment variable is not set.",
            );
        }

        const url = new URL(apiUrl);

        url.searchParams.set("identity", identity);
        setSocket(new WebSocket(url));
    }, [identity]);

    return { socket, onMessageType };
};
