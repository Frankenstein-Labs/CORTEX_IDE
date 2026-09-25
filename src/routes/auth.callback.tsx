import { createFileRoute } from "@tanstack/react-router";
import { AuthCallback } from "../public/AuthPage";
export const Route = createFileRoute("/auth/callback")({ component: AuthCallback });
