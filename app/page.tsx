import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Verified } from "lucide-react";

export default function Home() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 max-w-2xl mx-auto w-full">
                <Alert>
                    <Verified className="h-4 w-4" />
                    <AlertTitle>Welcome to KitsuVerify!</AlertTitle>
                    <AlertDescription>
                        We need to make sure you're really an adult.
                    </AlertDescription>
                </Alert>
                <Card>
                    <CardHeader>
                        <CardTitle>Account Lockdown</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-gray [&_li>strong]:block [&_li>strong]:mb-2">
                        <p>
                            Unfortunately, you have been flagged as a minor. Due
                            to this, your account has been locked until you can
                            prove your identity.
                        </p>

                        <p>
                            While your account is under lockdown, you should
                            know:
                        </p>

                        <ul>
                            <li>
                                <strong>
                                    You should NOT create another account on
                                    Kitsu.
                                </strong>
                                You have been conditionally suspended, and can
                                be unsuspended at this point if you validate
                                your identity. If you create a new account on
                                either Kitsu platform while conditionally
                                suspended, you will lose this opportunity.
                            </li>
                            <li>
                                <strong>
                                    You may NOT transfer in this state.
                                </strong>
                                Even if this is a conditional suspension, it is
                                still a suspension, which means that your
                                account is not permitted to be used in its
                                proper state.
                            </li>
                            <li>
                                <strong>
                                    You may request a backup, and/or
                                    termination.
                                </strong>
                                We will still honor your rights and afford you a
                                backup of your data, or request termination if
                                you'd like. You should note that your personally
                                identifiable information will be retained
                                indefinitely to carry out this suspension. If
                                you terminate, we will no longer be able to
                                honor an unsuspension. You may request this
                                information through email. You must email us
                                from your verified email, to&nbsp;
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
                            Kitsu utilizes Stripe for ID verification. We will
                            only check your date of birth, then request Stripe
                            redact your information permanently. Your
                            information will remain completely confidential.
                        </p>

                        <p>
                            If you'd like a way to manually verify your
                            identity, you may do so by emailing
                            admin@kitsunes.gay. Please note that it may take
                            longer than this automated process.
                        </p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
