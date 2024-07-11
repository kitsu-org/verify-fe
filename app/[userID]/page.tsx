"use client";
import { ThemeToggle } from "@/components/theme-trigger";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    MessageTypes,
    useServerConnection,
    type IdentificationMessage,
} from "@/hooks/useServerConnection";
import { Info } from "lucide-react";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Verified } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home({ params }: { params: { userID: string } }) {
    const userId = params.userID;
    const [userInfo, setUserInfo] = useState<
        IdentificationMessage["data"] | null
    >(null);
    let acceptedInfo = false;
    const { socket, onMessageType } = useServerConnection(params.userID);

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

    onMessageType(MessageTypes.FailedIdentification, () => {
        if (!acceptedInfo) {
            acceptedInfo = true;
            setUserInfo({ username: "lookup.failed", banType: "none" });
        }
    });
    onMessageType(MessageTypes.Identification, (info) => {
        if (!acceptedInfo) {
            acceptedInfo = true;
            setUserInfo(info);
        }
    });

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
                        {userId === null ? (
                            <text>
                                There's not too much for you to do here.
                            </text>
                        ) : (
                            <text>
                                We need to make sure you're really an adult.
                            </text>
                        )}
                    </AlertDescription>
                </Alert>
                <Card className="relative">
                    <CardHeader>
                        {userInfo?.username === "lookup.failed" ? (
                            <CardTitle>Well, this is awkward.</CardTitle>
                        ) : userInfo?.username ? (
                            <CardTitle>Hi, @{userInfo.username}.</CardTitle>
                        ) : userId === null ? (
                            <CardTitle>Welcome to KitsuVerify.</CardTitle>
                        ) : (
                            <CardTitle>
                                <Info style={{ display: "inline-block" }} />
                                &emsp; One Moment.
                            </CardTitle>
                        )}
                    </CardHeader>
                    <CardContent className="prose prose-gray dark:prose-invert [&_li>strong]:block [&_li>strong]:mb-2">
                        {userInfo?.username === "lookup.failed" ? (
                            <text>
                                We're unable to validate your identity. Could
                                you try again?
                                <br />
                                If you're still having troubles, please reach
                                out to the{" "}
                                <a
                                    href="mailto:admin@kitsunes.gay?subject=Failed%20Verification"
                                    className="underline"
                                >
                                    admin
                                </a>{" "}
                                team.
                            </text>
                        ) : userInfo?.banType === "none" ? (
                            <text>
                                You have no need to verify your identity.
                                <br />
                                Thank you for being a part of Kitsu!
                            </text>
                        ) : userInfo?.banType === "permanent" ? (
                            redirect("/verify/reject")
                        ) : userInfo?.banType === "conditional" ? (
                            <text>
                                <p>
                                    Unfortunately, you have been flagged as a
                                    minor. Due to this, your account has been
                                    locked until you can prove your identity.
                                </p>

                                <p>
                                    While your account is under lockdown, you
                                    should know:
                                </p>

                                <ul>
                                    <li>
                                        <strong>
                                            You should NOT create another
                                            account on Kitsu.
                                        </strong>
                                        You have been conditionally suspended,
                                        and can be unsuspended at this point if
                                        you validate your identity. If you
                                        create a new account on either Kitsu
                                        platform while conditionally suspended,
                                        you will lose this opportunity.
                                    </li>
                                    <li>
                                        <strong>
                                            You may NOT transfer in this state.
                                        </strong>
                                        Even if this is a conditional
                                        suspension, it is still a suspension,
                                        which means that your account is not
                                        permitted to be used in its proper
                                        state.
                                    </li>
                                    <li>
                                        <strong>
                                            You may request a backup, and/or
                                            termination.
                                        </strong>
                                        We will still honor your rights and
                                        afford you a backup of your data, or
                                        request termination if you'd like. You
                                        should note that your personally
                                        identifiable information will be
                                        retained indefinitely to carry out this
                                        suspension. If you terminate, we will no
                                        longer be able to honor an unsuspension.
                                        You may request this information through
                                        email. You must email us from your
                                        verified email, to&nbsp;
                                        <a
                                            href="mailto:admin@kitsunes.gay"
                                            className="underline"
                                        >
                                            admin@kitsunes.gay
                                        </a>
                                        .
                                    </li>
                                </ul>

                                <h3>How do you verify my age?</h3>
                                <p>
                                    Kitsu utilizes Stripe for ID verification.
                                    We will only check your date of birth, then
                                    request Stripe redact your information
                                    permanently. Your information will remain
                                    completely confidential.
                                </p>

                                <p>
                                    If you'd like a way to manually verify your
                                    identity, you may do so by emailing
                                    admin@kitsunes.gay. Please note that it may
                                    take longer than this automated process.
                                </p>
                            </text>
                        ) : (
                            <text>
                                Let me double check your eligibility to use
                                KitsuVerify.
                            </text>
                        )}
                    </CardContent>

                    {userInfo?.banType === "conditional" ? (
                        <CardFooter className="sticky bottom-0 bg-card pt-4 border-t shadow rounded-b-lg flex flex-col-reverse gap-4">
                            <Link href={`${userId}/verify`} className="w-full">
                                <Button className="w-full">
                                    Verify your age
                                </Button>
                            </Link>
                        </CardFooter>
                    ) : null}
                </Card>
            </main>
        </div>
    );
}
