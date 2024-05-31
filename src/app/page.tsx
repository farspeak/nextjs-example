import TodoAppComponent from "@/components/todo-app-component";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-start p-24 bg-zinc-100">
      <h1 className="mb-8">Farspeak.ai Todos App</h1>
      <TodoAppComponent />
    </main>
  );
}
