"use server";

import { Todo } from "@/app/types/types";
import farspeak from "@/farspeak/init";

export async function askAnything(ask: string) {
  const inquiry: { answer: string } = await farspeak
    .entity("todos")
    .inquire(ask);
  return inquiry;
}

export async function createTodo(
  todo: Omit<Todo, "id">,
): Promise<{ ids: string[] }> {
  const idResult = await farspeak.entity("todos").write([todo]);
  return idResult;
}

export async function getTodos() {
  const todos = await farspeak.entity("todos").getAll<Todo, "todos">();
  return todos;
}

export async function deleteAll() {
  const deleted: { deleted: number } = await farspeak
    .entity("todos")
    .deleteAll();
  return { ...deleted };
}

export async function updateTodo(id: string, { ...props }) {
  const updated = await farspeak.entity("todos").update<Todo>({ id, ...props });
  console.log({ updated });
  return updated;
}
