"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const inputClass =
    "h-11 w-full rounded-lg border border-input bg-background px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-[#F97316] focus-visible:ring-2 focus-visible:ring-[#F97316]/20 dark:bg-input/30";

const SignInPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError("Please enter both your email and password.");
            return;
        }

        setError("");

        const formData = { email, password };

        try {
            const { data, error } = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                setError(error.message || "Login failed. Please try again!");
                toast.error(error.message);
                return;
            }

            console.log("Login successful:", data);

            toast.success("Login successful!");

            router.push("/");

        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error(error);
        }
    };

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    }

    return (
        <main className="flex-1 bg-muted/30">
            <div className="mx-auto max-w-md px-4 py-12 md:py-16">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                    <header className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#EA580C] dark:text-[#F97316]">
                            Welcome Back
                        </p>
                        <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            Login to StudioSpace
                        </h1>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            Enter your details to access your StudioSpace account.
                        </p>
                    </header>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                    setError("");
                                }}
                                placeholder="you@example.com"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-3">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium text-foreground"
                                >
                                    Password
                                </label>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-[#EA580C] transition-colors hover:text-[#F97316] dark:text-[#F97316]"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                    setError("");
                                }}
                                placeholder="Enter your password"
                                required
                                className={inputClass}
                            />
                        </div>

                        {error && (
                            <p role="alert" className="text-sm font-medium text-destructive">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#F97316] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#EA580C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/40"
                        >
                            Login
                        </button>
                    </form>

                    <div className="my-5 flex items-center gap-3">
                        <span className="h-px flex-1 bg-border" />
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            or
                        </span>
                        <span className="h-px flex-1 bg-border" />
                    </div>

                    <button
                        onClick={handleGoogleSignIn}
                        type="button"
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/30"
                    >
                        <FcGoogle aria-hidden className="h-5 w-5" />
                        Continue with Google
                    </button>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-semibold text-[#EA580C] transition-colors hover:text-[#F97316] dark:text-[#F97316]"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default SignInPage;
