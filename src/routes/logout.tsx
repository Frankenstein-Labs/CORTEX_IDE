import { createFileRoute } from "@tanstack/react-router";
import { LogoutRoute } from "../public/AuthPage";
export const Route = createFileRoute("/logout")({ component: LogoutRoute });
