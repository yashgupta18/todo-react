import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import './TodoList.css';
import Checkmark from "../assets/Checkmark";
import Button from "./Button";
interface TodoListProps {
  // parentId: string;
}

const TodoList: React.FC<TodoListProps> = () => {
  const { todos } = useContext(TodoContext);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  };
  return (
    <div>
      {todos.map((item, index) => (
        <div key={index}>
          <div
            className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleClick(index)}
          >
            <div className="accordion-title">{<Checkmark />}{item.title}{activeIndex === index ? '  -' : '   +'}</div>

            {activeIndex === index && (
              <Subtask subtasks={item?.subtasks} pid={ item.id} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const Subtask = ({subtasks, pid}) => {
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const { addSubtask } = useContext(TodoContext);

  const handleAddSubtask = (e,pid) => {
    e.preventDefault();
    if (subtaskTitle.trim()) {
      addSubtask(pid, subtaskTitle);
      setSubtaskTitle("");
    }
  };

  return (
    <ul>
      {subtasks.map((subtask) => (
        <li key={subtask.id}>{subtask.title}</li>
      ))}
      <li>
        <form onSubmit={(e)=>handleAddSubtask(e,pid)}>
          <input
            style={{height:"30px", margin: '10px' }}
            type="text"
            placeholder="Enter a subtask"
            value={subtaskTitle}
            onChange={(e) => setSubtaskTitle(e.target.value)}
          />
          <Button type="submit" title="Add Subtask" />
        </form>
      </li>
    </ul>
  );

}

export default TodoList;
