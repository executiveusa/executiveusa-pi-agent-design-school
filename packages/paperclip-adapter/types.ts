export interface PaperclipTask {
  id: string;
  title: string;
  assignee: string;
  status: "todo" | "in-progress" | "done";
  dueDate?: string;
  tags?: string[];
}

export interface PaperclipTeamMember {
  id: string;
  name: string;
  role: string;
}

export const ACADEMY_TEAM: PaperclipTeamMember[] = [
  { id: "dean", name: "Dean Agent", role: "Orchestrates enrollment, graduation, and agent lifecycle" },
  { id: "synthia", name: "Synthia Design Director", role: "Visual quality review and design authority" },
  { id: "librarian", name: "Prompt Librarian", role: "Prompt curation, versioning, and attribution" },
  { id: "proctor", name: "Eval Proctor", role: "Eval scoring, rubric management" },
  { id: "scout", name: "Model Scout", role: "Model discovery, recommendation, and profiles" },
  { id: "growth", name: "Growth Agent", role: "Approved social campaign drafts (no autonomous publish)" },
  { id: "security", name: "Security Reviewer", role: "Audit events, secret scanning, compliance" },
];
