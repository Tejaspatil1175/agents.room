import MarketplaceShell from "@/components/marketplace/MarketplaceShell";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketplace | agents.room",
  description: "Discover and install community AI agents",
};

export default function MarketplacePage() {
  return <MarketplaceShell />;
}
