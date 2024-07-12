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
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Verify({ params }: { params: { userID: string } }) {
    const stripe = useStripe();
    const router = useRouter();
    const { socket, onMessageType } = useServerConnection(params.userID);
    let acceptedInfo = false;
    const isInVerifySession = useRef(false);
    const [verifySteps, setVerifySteps] = useState<{
        unbanned: boolean;
        reacted: boolean;
    }>({ unbanned: false, reacted: false });
    const [step, setStep] = useState<
        | "eligibility"
        | "preVerify"
        | "stripeLoading"
        | "verifying"
        | "stripeCancel"
        | "consentDeclined"
        | "done"
    >("eligibility");

    onMessageType(MessageTypes.VerificationCompleteStep, (step) => {
        if (step === "redact") {
            setVerifySteps({
                unbanned: verifySteps.unbanned,
                reacted: true,
            });
        }
        if (step === "unban") {
            setVerifySteps({
                unbanned: true,
                reacted: verifySteps.reacted,
            });
        }
    });

    useEffect(() => {
        if (stripe) {
            onMessageType(MessageTypes.FailedIdentification, () => {
                return redirect(`/${params.userID}`);
            });
            onMessageType(MessageTypes.Identification, (info) => {
                if (acceptedInfo) {
                    return;
                }
                acceptedInfo = true;
                if (info?.banType === "conditional") {
                    if (stripe !== null) {
                        setStep("preVerify");
                    }
                }
                if (info?.banType === "permanent") {
                    router.push(`/${params.userID}/verify/reject`);
                }
                if (info?.banType === "none") {
                    router.push(`/${params.userID}`);
                }
            });

            onMessageType(MessageTypes.VerificationFailed, (data) => {
                if (data.reason === "underage") {
                    router.push(`/${params.userID}/verify/reject`);
                } else {
                    isInVerifySession.current = false;
                    setStep("stripeCancel");
                }
            });
            onMessageType(MessageTypes.VerificationComplete, () => {
                // Let's make the acceptance route obsolete - save on bandwith we already used.
                //                router.push(`/${params.userID}/verify/accept`);
                isInVerifySession.current = true;
                setStep("done");
            });

            onMessageType(MessageTypes.StripeSession, async (code) => {
                if (isInVerifySession.current) {
                    return;
                }
                isInVerifySession.current = true;
                const result = await stripe?.verifyIdentity(code);
                if (result?.error) {
                    if (
                        // So the error passed to this function is completely undefined if it's a userError ConsentDeclined.
                        // This is strange.
                        typeof result.error.code === "undefined" &&
                        typeof result.error.type === "undefined"
                    ) {
                        isInVerifySession.current = false;
                        setStep("consentDeclined");
                    } else if (result.error.code === "session_cancelled") {
                        // SessionCanceled is called when the user clicked out of the window, or presses the X. Sometimes, stuff happens.
                        isInVerifySession.current = false;
                        setStep("preVerify");
                    } else {
                        // Handle any other error.
                        isInVerifySession.current = false;
                        setStep("stripeCancel");
                    }

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
        }
    }, [stripe, params.userID, acceptedInfo, router, socket, onMessageType]);

    const startVerification = () => {
        setStep("stripeLoading");
        socket?.send(
            JSON.stringify({
                type: "verify",
                data: {
                    identity: params.userID,
                },
            }),
        );
    };

    useEffect(() => {
        const identifyUser = () => {
            socket?.send(
                JSON.stringify({
                    type: "identify",
                    data: {
                        userId: params.userID,
                    },
                }),
            );
        };

        socket?.addEventListener("open", identifyUser);

        return () => socket?.removeEventListener("open", identifyUser);
    }, [socket, params]);

    const renderState = (stepName: typeof step) => {
        switch (stepName) {
            case "done": {
                return (
                    <div className="flex flex-col gap-4 prose prose-gray dark:prose-invert">
                        <p>Everything checks out. Thanks!</p>
                        {verifySteps.unbanned ? (
                            <text>You have been reinstated!</text>
                        ) : (
                            <text>
                                We are currently reinstating your account.
                            </text>
                        )}
                        {verifySteps.reacted ? (
                            <text>
                                Your information with stripe has been redacted.
                            </text>
                        ) : (
                            <text>
                                We are currently redacting your information with
                                stripe.
                            </text>
                        )}
                        {verifySteps.unbanned && verifySteps.reacted ? (
                            <text>
                                You may now close this tab. Welcome back!
                            </text>
                        ) : (
                            <text>Just give us one more minute...</text>
                        )}
                    </div>
                );
            }
            case "eligibility": {
                return (
                    <div className="flex flex-col gap-4 prose prose-gray dark:prose-invert">
                        <p>One moment. We're gettting set up.</p>
                    </div>
                );
            }
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
            case "consentDeclined": {
                return (
                    <div className="flex flex-col gap-4 prose prose-gray dark:prose-invert">
                        <p>
                            Looks like you chose to decline verification.
                            <br />
                            That's okay. We won't judge - and you won't be
                            penalized.
                            <h3>Your options</h3>
                            <ul>
                                <li>
                                    You are free to restart verification, if you
                                    change your mind.
                                </li>
                                <li>
                                    If you would like manual processing if your
                                    identity, you can ask for a manual review.
                                    <br />
                                    <b>You should note:</b> it will take much
                                    longer for a manual review.
                                </li>
                            </ul>
                        </p>
                    </div>
                );
            }
            case "stripeCancel": {
                return (
                    <div className="flex flex-col gap-4 prose prose-gray dark:prose-invert">
                        <p>
                            Sorry. There seems to have been an issue. Could you
                            try again?
                        </p>
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
                                "eligibility",
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
