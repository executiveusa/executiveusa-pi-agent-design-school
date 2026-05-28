export * from "./types";

export async function createTask(_task: import("./types").PaperclipTask): Promise<void> {
  console.log("[Paperclip Adapter] createTask called — mocked. Configure PAPERCLIP_API_KEY to enable.");
}

export async function listTasks(): Promise<import("./types").PaperclipTask[]> {
  console.log("[Paperclip Adapter] listTasks called — mocked.");
  return [];
}
