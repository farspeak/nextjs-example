/**
 * v0 by Vercel.
 * @see https://v0.dev/t/C4pUzv4pPB4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  askAnything,
  createTodo,
  deleteAll,
  getTodos,
  updateTodo,
} from "@/actions/todos";
import { Todo } from "@/app/types/types";

export default function Component() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [deletedText, setDeletedText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    const fetchTodos = async () => {
      const todosResult = await getTodos();
      setTasks(todosResult.todos);
    };
    fetchTodos();
  }, []);
  const handleDeleteAll = async () => {
    const deleteAllResult = await deleteAll();
    setDeletedText(`Deleted ${deleteAllResult.deleted} tasks`);
    setTasks([]);
    setAnswer("");
    setSearchText("");
  };
  const handleCreateTask = async () => {
    await createTodo({ title: newTaskText, completed: false });
    const todosResult = await getTodos();
    setTasks(todosResult.todos);
    setShowModal(false);
    setAnswer("");
    setDeletedText("");
    setNewTaskText("");
  };
  const handleUpdateTask = async (id: string, { ...props }) => {
    const updated = await updateTodo(id, props);
    const todosResult = await getTodos();
    setAnswer("");
    setDeletedText("");
    setTasks(todosResult.todos);
  };
  const handleAsk = async () => {
    const answerResult = await askAnything(searchText);
    setAnswer(answerResult.answer);
    setDeletedText("");
  };
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <Input
          type="text"
          placeholder="Ask and press enter..."
          value={searchText}
          onKeyDown={async (e) => {
            if (e.code === "Enter") {
              await handleAsk();
            }
          }}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 mr-4"
        />
        <div className="flex gap-2">
          <Button onClick={() => setShowModal(true)}>Add New</Button>
          <Button variant="outline" onClick={handleDeleteAll}>
            Delete All
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        {deletedText && <p className="p-3">{deletedText}</p>}
        {answer && <p className="p-3">{answer}</p>}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-md p-3"
          >
            <div className="flex items-center gap-3">
              <Checkbox
                id={`task-${task.id}`}
                onCheckedChange={async (completed) => {
                  await handleUpdateTask(task.id, { completed });
                }}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={`text-sm font-medium ${
                  task.completed
                    ? "line-through text-gray-500 dark:text-gray-400"
                    : ""
                }`}
              >
                {task.title}
              </label>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Enter the details of your new task.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="task" className="text-right">
                Task
              </Label>
              <Input
                id="task"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTask} className="ml-auto">
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
