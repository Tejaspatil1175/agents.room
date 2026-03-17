import AgentDetailShell from "@/components/agent/detail/AgentDetailShell";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Details | agents.room",
  description: "View and manage your agent",
};

export default function AgentDetailPage({ params }: { params: { id: string } }) {
  return <AgentDetailShell id={params.id} />;
}
