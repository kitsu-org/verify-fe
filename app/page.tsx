"use client";
import { ThemeToggle } from "@/components/theme-trigger";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Verified } from "lucide-react";

export default function Home() {
    return (
        <div className="flex min-h-screen w-full flex-col relative">
            <div className="absolute top-4 right-4 z-10 hidden md:block">
                <ThemeToggle />
            </div>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 max-w-2xl mx-auto w-full">
                <Alert>
                    <Verified className="h-4 w-4" />
                    <AlertTitle>Welcome to KitsuVerify!</AlertTitle>
                    <AlertDescription>
                        There's not too much for you to do here.
                    </AlertDescription>
                </Alert>
                <Card className="relative">
                    <CardHeader>
                        <CardTitle>Welcome to KitsuVerify.</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-gray dark:prose-invert [&_li>strong]:block [&_li>strong]:mb-2">
                        <text>
                            KitsuVerify is a ID Verification system to verify
                            suspected minors are not on the platform. Right now,
                            identification cannot be volunteered.
                            <br />
                            <br />
                            But hey, why not check out{" "}
                            <a href="https://kitsu.life">Kitsu's website</a>?
                        </text>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
