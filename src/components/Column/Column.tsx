import Task from "../Task/Task";
import "./Column.css";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
type Task = {
  id: number;
  title: string;
};
export const Column: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  return (
    <div className="column">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
      {tasks.map((task) => (
        <Task id={task.id} title={task.title} key={task.id}/>
      ))}</SortableContext>
    </div> 
  );
};

export default Column;
