// Global type definitions for agents.room

export type AgentStatus = "active" | "paused" | "error";
export type DeliveryChannel = "whatsapp" | "email" | "telegram" | "slack";
export type ScheduleFrequency = "daily" | "weekly" | "weekdays";

export interface Agent {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: AgentStatus;
  channel: DeliveryChannel;
  schedule: string;
  timezone: string;
  taskDescription: string;
  createdAt: string;
  totalRuns: number;
  successRate: number;
  lastRun: string;
  nextRun: string;
}

export interface AgentRun {
  id: string;
  status: "success" | "error";
  timestamp: string;
  duration: string;
  outputLength: string;
}

export interface AgentOutput {
  id: string;
  timestamp: string;
  content: string;
}

export interface Schedule {
  frequency: ScheduleFrequency;
  hour: string;
  minute: string;
  period: "AM" | "PM";
  timezone: string;
  days: string[];
}

export interface MarketplaceTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  channel: DeliveryChannel;
  rating: number;
  installs: number;
  author: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  timezone: string;
  avatar?: string;
}
