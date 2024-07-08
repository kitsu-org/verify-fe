"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { ErrorComponent } from "next/dist/client/components/error-boundary";
import { useEffect } from "react";

const ErrorBoundary: ErrorComponent = ({ error, reset }) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-xl">
                <CardHeader>
                    <CardTitle>An error happened</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert">
                    <pre>
                        <code>{error.message}</code>
                    </pre>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button className="w-full" onClick={reset}>
                        Reload
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ErrorBoundary;
