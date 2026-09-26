import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "../public/AuthPage";

export const Route = createFileRoute("/reset-password")({
  component: () => <AuthPage mode="reset-password" />,
});
