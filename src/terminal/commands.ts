export interface TerminalCommand {
  command: string;
  description: string;
  execute: (args: string[]) => string | Promise<string>;
}

export const commands: TerminalCommand[] = [
  {
    command: "help",
    description: "Show available commands",
    execute: () => "Available commands: help, whoami, skills, projects, clear, exit, date",
  },
  {
    command: "whoami",
    description: "Display current user identity",
    execute: () => "USER_ROLE: Senior Technologist | ACCESS_LEVEL: Alpha | STATUS: Authenticated",
  },
  {
    command: "skills",
    description: "List technical expertise",
    execute: () => "DATA_SCIENCE: Python, TF, PyTorch | FULLSTACK: React, Next, Node | SECURITY: Pentesting, OSCP",
  },
  {
    command: "projects",
    description: "List featured projects",
    execute: () => "RETRIEVING_DATABASE... [Neural Vision AI], [Cyber Guard Terminal], [Nexus E-Commerce]",
  },
  {
    command: "resume",
    description: "Access the personnel archive",
    execute: () => "ACCESS_GRANTED: Initializing holographic profile viewer...",
  },
  {
    command: "date",
    description: "Show system date",
    execute: () => new Date().toISOString(),
  },
];
