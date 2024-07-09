"use client";

import { ThemeToggle } from "@/components/theme-trigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerificationAccepted() {
    return (
        <div className="flex min-h-screen w-full flex-col relative">
            <div className="absolute top-4 right-4 z-10 hidden md:block">
                <ThemeToggle />
            </div>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 max-w-2xl mx-auto w-full items-center justify-center">
                <Card className="relative w-full">
                    <CardHeader>
                        <CardTitle>
                            You're all set. Sorry for the interruption.
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-gray dark:prose-invert">
                        <p>
                            Thank you for verifying your age. Your account has
                            been <strong>reinstated</strong>
                        </p>
                        <p>
                            We are now removing all personal information from
                            Stripe and unsuspending your account.
                        </p>
                        <p>You may close this tab.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
