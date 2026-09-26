import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "../public/AuthPage";
export const Route = createFileRoute("/sign-in")({ component: () => <AuthPage mode="sign-in" /> });
