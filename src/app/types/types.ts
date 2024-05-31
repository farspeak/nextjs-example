export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type CreateTodo = (todo: Todo) => Promise<{ ids: string[] }>;
