"use client";

import { ThemeToggle } from "@/components/theme-trigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerificationRejected() {
    return (
        <div className="flex min-h-screen w-full flex-col relative">
            <div className="absolute top-4 right-4 z-10 hidden md:block">
                <ThemeToggle />
            </div>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 max-w-2xl mx-auto w-full items-center justify-center">
                <Card className="relative w-full">
                    <CardHeader>
                        <CardTitle>It was fun.</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-gray dark:prose-invert">
                        <p>
                            Stripe has just notified us that you are under the
                            age of majority, and cannot validate your identity.
                        </p>
                        <p>
                            This directly violates KitsuCore, as no user under
                            the age of majority is permitted to use KitsuGay.
                        </p>
                        <p>
                            For this reason, this suspension is{" "}
                            <strong>no longer conditional</strong>.
                        </p>
                        <p>
                            Your agreement with Kitsu has been terminated. You
                            may not request backups. Any pornographic material
                            will be deleted from your account.
                        </p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
