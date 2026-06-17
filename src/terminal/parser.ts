import { TerminalCommand } from "./commands";

export async function parseCommand(input: string, commands: TerminalCommand[]): Promise<string> {
  const [cmdName, ...args] = input.toLowerCase().trim().split(/\s+/);

  if (!cmdName) return "";

  const command = commands.find((c) => c.command === cmdName);

  if (command) {
    return await command.execute(args);
  }

  if (cmdName === "help") {
     return `Available commands: ${commands.map(c => c.command).join(", ")}, clear, exit`;
  }

  return `Command not found: ${cmdName}. Type 'help' for assistance.`;
}
