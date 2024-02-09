import "./App.css";
import { useState } from "react";
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core";
import Column from "./components/Column/Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Input from "./components/Input/Input";

function App() {
  type Task = {
    id: number;
    title: string;
  };

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "TypeScript" },
    { id: 2, title: "React" },
    { id: 3, title: "Vite" },
  ]);

  const addTask = (title: unknown) => {
    setTasks(tasks => [...tasks, {id: tasks.length + 1, title}])
  }

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
   
  )

  return (
    <>
      <div className="App">
        <h1>Trollo</h1>
        <Input onSubmit={addTask}/>
        <DndContext
        sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <Column tasks={tasks} />
        </DndContext>
      </div>
      
    </>
  );
}

export default App;
