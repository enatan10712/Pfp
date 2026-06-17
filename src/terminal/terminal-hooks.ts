"use client";

import { useState, useEffect, useCallback } from "react";
import { parseCommand } from "./parser";
import { commands as initialCommands, TerminalCommand } from "./commands";

export function useTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [registeredCommands, setRegisteredCommands] = useState<TerminalCommand[]>(initialCommands);

  useEffect(() => {
    setIsMounted(true);
    setHistory(["Welcome to the SECURE_ARCHIVE Terminal v1.1.0", "Type 'help' for available commands."]);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === "T") {
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const registerCommand = useCallback((newCommand: TerminalCommand) => {
    setRegisteredCommands(prev => {
      if (prev.find(c => c.command === newCommand.command)) return prev;
      return [...prev, newCommand];
    });
  }, []);

  const execute = useCallback(async (input: string) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    if (trimmedInput.toLowerCase() === "clear") {
      setHistory([]);
      return;
    }
    if (trimmedInput.toLowerCase() === "exit") {
      setIsOpen(false);
      return;
    }

    const response = await parseCommand(trimmedInput, registeredCommands);
    setHistory(prev => [...prev, `> ${trimmedInput}`, response]);
  }, [registeredCommands]);

  return { isOpen, setIsOpen, history, execute, isMounted, registerCommand };
}
