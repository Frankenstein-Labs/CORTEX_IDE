import { createFileRoute } from "@tanstack/react-router";
import { MarketingLanding } from "../public/MarketingLanding";

export const Route = createFileRoute("/")({ component: MarketingLanding });
