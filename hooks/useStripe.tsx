"use client";

import { type Stripe, loadStripe } from "@stripe/stripe-js";
import { env } from "next-runtime-env";
import { useEffect, useState } from "react";

export const useStripe = () => {
    const [stripe, setStripe] = useState<Stripe | null>(null);

    useEffect(() => {
        const key = env("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");

        if (!key) {
            throw new TypeError(
                "The NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable is not set.",
            );
        }

        (async () => {
            setStripe(await loadStripe(key));
        })();
    }, []);

    return stripe;
};
