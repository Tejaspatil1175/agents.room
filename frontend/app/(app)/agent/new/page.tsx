import CreateAgentShell from "@/components/agent/CreateAgentShell";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Agent | agents.room",
  description: "Set up a new personal AI agent",
};

export default function CreateAgentPage() {
  return <CreateAgentShell />;
}
