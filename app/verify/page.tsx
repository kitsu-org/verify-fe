"use client";

import { ThemeToggle } from "@/components/theme-trigger";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MessageTypes, useServerConnection } from "@/hooks/useServerConnection";
import { useStripe } from "@/hooks/useStripe";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Verify() {
    const stripe = useStripe();
    const { socket, onMessageType } = useServerConnection();
    const [step, setStep] = useState<
        "preVerify" | "stripeLoading" | "verifying" | "done"
    >("verifying");

    onMessageType(MessageTypes.StripeCode, async (code) => {
        const result = await stripe?.verifyIdentity(code);

        if (result?.error) {
            socket?.send(
                JSON.stringify({
                    type: "stripeerror",
                    data: result.error,
                }),
            );
        } else {
            socket?.send(
                JSON.stringify({
                    type: "stripedone",
                }),
            );
        }
    });

    const startVerification = () => {
        setStep("stripeLoading");
        socket?.send(
            JSON.stringify({
                type: "verify",
            }),
        );
    };

    const renderState = (stepName: typeof step) => {
        switch (stepName) {
            case "preVerify": {
                return (
                    <div className="flex flex-col gap-4 prose prose-gray dark:prose-invert">
                        <p>
                            Click the button to begin Stripe age verification.
                        </p>
                    </div>
                );
            }
            case "stripeLoading": {
                return (
                    <div className="flex grow min-h-[50vh] items-center justify-center">
                        <Loader2 className="animate-spin size-12" />
                    </div>
                );
            }
            case "verifying": {
                return (
                    <div className="prose prose-gray dark:prose-invert">
                        <p>
                            We are now validating your age: this might take a
                            few minutes.
                        </p>
                        <p>
                            When we are done, this page will automatically
                            update.
                        </p>
                    </div>
                );
            }
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col relative">
            <div className="absolute top-4 right-4 z-10 hidden md:block">
                <ThemeToggle />
            </div>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 max-w-2xl mx-auto w-full items-center justify-center">
                <Card className="relative w-full">
                    <CardHeader>
                        <CardTitle>Account Verification</CardTitle>
                    </CardHeader>
                    <CardContent className="">{renderState(step)}</CardContent>
                    <CardFooter className="sticky bottom-0 bg-card pt-4 border-t shadow rounded-b-lg flex flex-col-reverse gap-4">
                        <Button
                            disabled={[
                                "stripeLoading",
                                "verifying",
                                "done",
                            ].includes(step)}
                            onClick={startVerification}
                            className="w-full"
                        >
                            Begin verification
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        </div>
    );
}
