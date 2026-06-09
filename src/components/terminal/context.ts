"use client";

import { createContext, useContext } from "react";

/** Lets inline command words / links trigger the router from anywhere in the tree. */
export const TerminalContext = createContext<{ run: (cmd: string) => void }>({
  run: () => {},
});

export const useTerminal = () => useContext(TerminalContext);
