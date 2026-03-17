import SettingsShell from "@/components/settings/SettingsShell";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | agents.room",
  description: "Manage your personal AI agents preferences",
};

export default function SettingsPage() {
  return <SettingsShell />;
}
