"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";

const inputClass =
    "h-11 w-full rounded-lg border border-input bg-background px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-[#F97316] focus-visible:ring-2 focus-visible:ring-[#F97316]/20 dark:bg-input/30";

// Returns an error message, or an empty string when the password is valid.
const validatePassword = (password: string) => {
    if (password.length < 6) {
        return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
    }
    return "";
};

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const error = validatePassword(password);

        if (error) {
            setPasswordError(error);
            return; // Do not proceed while the password is invalid.
        }

        setPasswordError("");

        // All form data is received here. Backend/registration comes later.
        const formData = { name, email, photoUrl, password };
        console.log("Registration form data:", formData);
    };

    return (
        <main className="flex-1 bg-muted/30">
            <div className="mx-auto max-w-md px-4 py-12 md:py-16">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                    <header className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#EA580C] dark:text-[#F97316]">
                            Get Started
                        </p>
                        <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            Create your StudioSpace account
                        </h1>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            Join StudioSpace to discover and book creative spaces.
                        </p>
                    </header>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-foreground">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Your full name"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="you@example.com"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="photoUrl" className="text-sm font-medium text-foreground">
                                Photo URL
                            </label>
                            <input
                                id="photoUrl"
                                type="url"
                                value={photoUrl}
                                onChange={(event) => setPhotoUrl(event.target.value)}
                                placeholder="https://example.com/your-photo.jpg"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-foreground">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                    setPasswordError("");
                                }}
                                placeholder="Create a password"
                                required
                                aria-invalid={passwordError ? true : undefined}
                                aria-describedby={passwordError ? "password-error" : undefined}
                                className={`${inputClass} ${
                                    passwordError ? "border-destructive focus-visible:border-destructive" : ""
                                }`}
                            />
                            {passwordError && (
                                <p
                                    id="password-error"
                                    className="text-xs font-medium text-destructive"
                                >
                                    {passwordError}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#F97316] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#EA580C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/40"
                        >
                            Register
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
                        type="button"
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/30"
                    >
                        <FcGoogle aria-hidden className="h-5 w-5" />
                        Continue with Google
                    </button>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/signin"
                            className="font-semibold text-[#EA580C] transition-colors hover:text-[#F97316] dark:text-[#F97316]"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default SignUpPage;
