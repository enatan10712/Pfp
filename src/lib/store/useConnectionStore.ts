"use client";

import { create } from "zustand";

interface ConnectionStore {
  activeProjectId: string | null;
  activeSkillIds: string[];
  activeCertIds: string[];
  setActiveProject: (id: string | null, skills?: string[], certs?: string[]) => void;
}

export const useConnectionStore = create<ConnectionStore>((set) => ({
  activeProjectId: null,
  activeSkillIds: [],
  activeCertIds: [],
  setActiveProject: (id, skills = [], certs = []) => set({
    activeProjectId: id,
    activeSkillIds: skills,
    activeCertIds: certs
  }),
}));
