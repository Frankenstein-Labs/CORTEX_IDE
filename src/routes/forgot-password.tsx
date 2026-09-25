import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "../public/AuthPage";
export const Route = createFileRoute("/forgot-password")({
  component: () => <AuthPage mode="forgot-password" />,
});
