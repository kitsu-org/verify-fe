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
    const { onMessageType } = useServerConnection();
    const [loading] = useState(false);

    onMessageType(MessageTypes.StripeCode, async (code) => {
        const result = await stripe?.verifyIdentity(code);

        if (result?.error) {
            throw result.error;
        }
    });

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
                    <CardContent className="min-h-[50vh]">
                        {loading ? (
                            <div className="flex grow items-center justify-center">
                                <Loader2 className="animate-spin size-12" />
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 prose prose-gray dark:prose-invert">
                                <p>
                                    Stripe will now open. Please follow the
                                    instructions to verify your age.
                                </p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="sticky bottom-0 bg-card pt-4 border-t shadow rounded-b-lg flex flex-col-reverse gap-4">
                        <Button disabled={true} className="w-full">
                            Verify your age
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        </div>
    );
}
